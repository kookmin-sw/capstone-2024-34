import { signJwtAccessToken } from "@libs/common/jwt";
import prisma from "@libs/common/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      userID: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.userPW))) {
    const { userPW, ...userWithoutPass } = user;

    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
