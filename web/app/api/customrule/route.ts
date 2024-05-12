import prisma from "@libs/common/prisma";

interface RequestBody {
  id: string;
  userid: string;
  ruleid: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const customRule = await prisma.customRule.create({
    data: {
      id: body.id,
      userid: body.userid,
      ruleid: body.ruleid,
    },
  });

  return new Response(JSON.stringify(customRule));
}

export async function GET(request: Request) {
  const customRules = await prisma.customRule.findMany();

  return new Response(JSON.stringify(customRules));
}
