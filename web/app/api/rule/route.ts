import prisma from "@libs/common/prisma";

interface RequestBody {
  time: string;
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
