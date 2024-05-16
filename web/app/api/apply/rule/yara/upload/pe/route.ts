import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

import { FilesPeUploaderResultResponse } from "@customTypes/generate/api";

import { decodeJwt, verifyJwt } from "@libs/common/jwt";
import {
  ApplyYaraPythonAPIResponse,
  ApplyYaraRuleFilesUploadResponse,
} from "@customTypes/apply/api";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  let savedData: ApplyYaraRuleFilesUploadResponse = {
    files: [],
    folderPath: "",
    yara: "",
  };

  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  try {
    const formData = await request.formData();
    console.log(formData);

    const files: File[] | null = formData.getAll(
      "upload_file[]",
    ) as unknown as File[];

    const yara: string = formData.get("yara") as string;
    savedData.yara = yara;

    console.log(files);

    if (!files) {
      return NextResponse.json({
        success: false,
        message: "업로드된 파일이 없습니다.",
      });
    }
    const folderName = uuidv4();
    const uploadDir = path.join(process.cwd(), "public", "uploads", folderName);
    const convFileNameDict: Record<string, string> = {};
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
        convFileNameDict[convFileName] = file.name;
        console.log("파일 저장 성공", savedData);
      } else {
        return NextResponse.json({
          success: false,
          message: "파일 업로드 실패",
        });
      }
    }

    console.log(JSON.stringify(savedData));

    const response_apply_yara = await fetch(
      `http://localhost:3000/api/apply/rule/yara`,
      {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data_apply_yara: ApplyYaraPythonAPIResponse =
      await response_apply_yara.json();

    data_apply_yara.output.data.map((item) => {
      item.filename = convFileNameDict[item.filename];
    });

    return NextResponse.json({
      success: true,
      message: "데이터 저장 성공",
      data_uploader: savedData,
      data_apply_yara: data_apply_yara,
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
