import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { client } from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  let user;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone,
      },
    });
  }

  if (user) console.log("found it");
  else {
    console.log("did not find. Will create.");
    user = await client.user.create({
      data: {
        name: "Anonymous",
        phone: +phone || Math.round(Math.random() * 1000000),
        email,
      },
    });
    console.log(`user with the email <${user.email}>is created`);
  }
  return res.json({ ok: true });
}

export default withHandler("POST", handler);
