import prisma from "@libs/common/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  userID: string;
  userPW: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      userID: body.userID,
      userPW: await bcrypt.hash(body.userPW, 10),
    },
  });

  const { userPW, ...result } = user;
  return new Response(JSON.stringify(result));
}
