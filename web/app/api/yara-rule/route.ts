import prisma from "@libs/common/prisma";

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

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const deletedRule = await prisma.yaraRule.delete({
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
