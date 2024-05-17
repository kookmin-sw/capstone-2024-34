import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { FileInfo } from "@customTypes/analyze/api";
import { decodeJwt, verifyJwt } from "@libs/common/jwt";

export async function POST(request: Request) {
  let savedData;
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  try {
    const formData = await request.formData();
    console.log(formData);

    const file: File | null = formData.get("upload_file") as unknown as File;
    const fileInfo: FileInfo = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileLastModified: file.lastModified,
    };
    console.log(file);

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
    } else {
      return NextResponse.json({
        success: false,
        message: "파일 업로드 실패",
      });
    }

    console.log(JSON.stringify(savedData));

    let response_header = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/file/pe`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/file/pe-string`,
      {
        method: "POST",
        body: JSON.stringify(savedData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data_strings = await response_strings.json();

    let reason = "";
    let result = 0;
    let tmp = {
      attack: data_strings.output.attack,
      normal: data_strings.output.normal,
    };

    if (data_strings.output.attack.length > 0) {
      reason = "attack";
      result = 1;
    } else if (data_strings.output.normal.length > 0) {
      reason = "normal";
      result = 0;
    } else {
      reason = "hold";
      result = 2;
    }

    const analysisbody = {
      time: fileInfo.fileLastModified,
      filename: fileInfo.fileName,
      analysis: JSON.stringify(tmp).toString(),
      score: data_strings.output.score,
      result: result,
      reason: reason,
      userid: decodeJwt(accessToken!).id,
    };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
      method: "POST",
      body: JSON.stringify(analysisbody),
    });

    return NextResponse.json({
      success: true,
      message: "데이터 저장 성공",
      data: { data_header, data_strings, fileInfo },
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
