import prisma from "@libs/common/prisma";
import { DateTime } from "next-auth/providers/kakao";

interface RequestBody {
  id: string;
  time: DateTime;
  rulename: string;
  rule: string;
  isuser: boolean;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const rule = await prisma.rule.create({
    data: {
      time: body.time,
      rulename: body.rulename,
      rule: body.rule,
      isuser: body.isuser,
    },
  });

  return new Response(JSON.stringify(rule));
}

export async function GET(request: Request) {
  const rules = await prisma.rule.findMany();

  return new Response(JSON.stringify(rules));
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const deletedRule = await prisma.rule.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(deletedRule));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete rule item" }),
      { status: 500 },
    );
  }
}
