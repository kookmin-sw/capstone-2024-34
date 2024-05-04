import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  let savedData;
  try {
    const formData = await request.formData();
    console.log(formData);

    const file: File | null = formData.get("upload_file") as unknown as File;

    if (file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const convFileName = `${uuidv4()}.${getFileExtension(file.name)}`;
      const path = `${process.cwd()}/public/uploads/${convFileName}`;
      await writeFile(path, buffer);

      savedData = {
        upload_file_path: convFileName,
        upload_file_filename: file.name,
      };

      console.log("파일 저장 성공", savedData);
    }

    console.log(JSON.stringify(savedData));

    let response_header = await fetch(
      `http://localhost:3000/api/analyze/file/pe`,
      {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data_header = await response_header.json();

    let response_strings = await fetch(
      `http://localhost:3000/api/analyze/file/pe-string`,
      {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data_strings = await response_strings.json();

    return NextResponse.json({
      success: true,
      message: "데이터 저장 성공",
      data: { data_header, data_strings },
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
