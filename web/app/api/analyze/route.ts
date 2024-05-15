import prisma from "@libs/common/prisma";
import { DateTime } from "next-auth/providers/kakao";

interface RequestBody {
  id?: string;
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

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

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
