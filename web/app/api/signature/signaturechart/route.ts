import prisma from "@libs/common/prisma";

export async function GET(request: Request) {
  const signatures = await prisma.signature.findMany({
    orderBy: {
      count: "desc",
    },
    take: 20,
  });

  return new Response(JSON.stringify(signatures));
}
