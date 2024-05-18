import prisma from "@libs/common/prisma";
import { decodeJwt, verifyJwt } from "@libs/common/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  id: string;
  ruleName: string;
  rule: string;
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.headers.get("authorization");

    if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json(
        { error: "No Authorization" },
        {
          status: 401,
        },
      );
    }
    const body: RequestBody = await request.json();
    await prisma.yaraRule.create({
      data: {
        rulename: `${body.ruleName}.yar`,
        rule: body.rule,
        userid: decodeJwt(accessToken!).id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "파일 업로드 성공",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const signatures = await prisma.yaraRule.findMany();

  return new Response(JSON.stringify(signatures));
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const updatedRule = await prisma.yaraRule.update({
      where: {
        id: body.id,
      },
      data: {
        rulename: body.ruleName,
        rule: body.rule,
      },
    });
    return NextResponse.json(updatedRule);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update rule item" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const deletedRule = await prisma.yaraRule.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json(deletedRule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete rule item" },
      { status: 500 },
    );
  }
}
