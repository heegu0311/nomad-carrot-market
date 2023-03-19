import { Prisma } from "@prisma/client";
import { client } from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.user.create({
      data: {
        phone: 01012345678,
        name: "asdasd11231223",
        email: "heegu03111231123@gmail.com",
        avatar: "asdas1d123123231",
      },
    });

    res.json({
      ok: true,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    throw e;
  }
}
