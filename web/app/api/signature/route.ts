import prisma from "@libs/common/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  signature: string;
  count: number;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    if (typeof body.signature !== "string") {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    const signature = await prisma.signature.create({
      data: {
        signature: body.signature,
        count: body.count,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "데이터 저장 성공",
        signature: signature,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const signatures = await prisma.signature.findMany();

  return new Response(JSON.stringify(signatures));
}
