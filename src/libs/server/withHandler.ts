import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) return res.status(405).end();
    try {
      await fn(req, res);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e });
    }
  };
}
