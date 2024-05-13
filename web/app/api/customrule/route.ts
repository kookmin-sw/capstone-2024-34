import prisma from "@libs/common/prisma";

interface RequestBody {
  id: string;
  userid: string;
  ruleid: string;
}

interface RequestDeleteBody {
  id: string;
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
