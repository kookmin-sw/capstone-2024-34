import prisma from "@libs/common/prisma";

interface RequestBody {
  id: string;
  time: Date;
  filename: string;
  analysis: string;
  score: number;
  result: number;
  reason: string;
  userid: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const analysis = await prisma.analysis.create({
    data: {
      id: body.id,
      time: new Date(body.time),
      filename: body.filename,
      analysis: body.analysis,
      score: body.score,
      result: body.result,
      reason: body.reason,
      userid: body.userid,
    },
  });

  return new Response(JSON.stringify(analysis));
}

export async function GET(request: Request) {
  const analysis = await prisma.analysis.findMany();

  return new Response(JSON.stringify(analysis));
}
