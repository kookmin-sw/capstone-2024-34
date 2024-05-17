import prisma from "@libs/common/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  id?: string;
  rulename: string;
  rule: string;
  userid: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const rule = await prisma.yaraRule.create({
    data: {
      rulename: body.rulename,
      rule: body.rule,
      userid: body.userid,
    },
  });

  return new Response(JSON.stringify(rule));
}

export async function GET(request: Request) {
  const rules = await prisma.yaraRule.findMany();

  return new Response(JSON.stringify(rules));
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const updatedRule = await prisma.yaraRule.update({
      where: {
        id: body.id,
      },
      data: {
        ruleName: body.rulename,
        rule: body.rule,
      },
    });
    return NextResponse.json(updatedRule);
  } catch (error) {
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
