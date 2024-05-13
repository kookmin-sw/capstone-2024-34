import prisma from "@libs/common/prisma";

interface RequestBody {
  id: string;
  time: string;
  rulename: string;
  rule: string;
  isuser: boolean;
}

interface RequestDeleteBody {
  id: string;
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
  const body: RequestDeleteBody = await request.json();

  try {
    const deletedAnalysis = await prisma.analysis.delete({
      where: {
        id: body.id,
      },
    });

    return new Response(JSON.stringify(deletedAnalysis));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete analysis item" }),
      { status: 500 },
    );
  }
}
