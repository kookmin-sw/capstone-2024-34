import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

import prisma from "@libs/common/prisma";
import { decodeJwt, verifyJwt } from "@libs/common/jwt";

export async function POST(request: Request) {
  let dbData;
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json(
      { error: "No Authorization" },
      {
        status: 401,
      },
    );
  }

  try {
    const formData = await request.formData();
    console.log(formData);

    const file: File | null = formData.get("upload_file") as unknown as File;
    console.log(file);

    if (file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const convFileName = `${uuidv4()}.${getFileExtension(file.name)}`;
      const path = `${process.cwd()}/public/uploads/tmp/${convFileName}`;
      await writeFile(path, buffer);

      const yarTextData = await readFile(path, "utf-8");

      dbData = await prisma.yaraRule.create({
        data: {
          rulename: `${file.name}`,
          rule: yarTextData,
          userid: decodeJwt(accessToken!).id,
        },
      });
      console.log("룰 DB 삽입 성공", dbData);
    } else {
      return NextResponse.json({
        success: false,
        message: "파일 업로드 실패",
      });
    }

    return NextResponse.json({
      success: true,
      message: "데이터 저장 성공",
      data_db: dbData,
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
