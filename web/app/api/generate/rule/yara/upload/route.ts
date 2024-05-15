import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { FilesPeUploaderResultResponse } from "@customTypes/generate/api";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  let savedData: FilesPeUploaderResultResponse = { files: [], folderPath: "" };

  try {
    const formData = await request.formData();
    console.log(formData);

    const files: File[] | null = formData.getAll(
      "upload_file[]",
    ) as unknown as File[];
    console.log(files);

    if (!files) {
      return NextResponse.json({
        success: false,
        message: "업로드된 파일이 없습니다.",
      });
    }
    const folderName = uuidv4();
    const uploadDir = path.join(process.cwd(), "public", "uploads", folderName);
    await mkdir(uploadDir, { recursive: true });
    savedData.folderPath = folderName;

    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const convFileName = `${uuidv4()}.${getFileExtension(file.name)}`;
        const finalSavePath = path.join(uploadDir, convFileName);
        await writeFile(finalSavePath, buffer);

        savedData.files.push({
          origin_filename: file.name,
          conv_filename: convFileName,
        });
        console.log("파일 저장 성공", savedData);
      } else {
        return NextResponse.json({
          success: false,
          message: "파일 업로드 실패",
        });
      }
    }
    //
    // console.log(JSON.stringify(savedData));

    let response_create_yara = await fetch(
      `http://localhost:3000/api/generate/rule/yara/auto`,
      {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data_yara = await response_create_yara.json();

    return NextResponse.json({
      success: true,
      message: "데이터 저장 성공",
      data_uploader: savedData,
      data_yara: data_yara.output,
    });
  } catch (error) {
    console.error("데이터 저장 중 오류 발생:", error);
    return NextResponse.json({ success: false, message: "데이터 저장 실패" });
  }
}

function getFileExtension(filename: string) {
  const _fileLen = filename.length;
  const _lastDot = filename.lastIndexOf(".") + 1;
  const fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
  return fileExt;
}
