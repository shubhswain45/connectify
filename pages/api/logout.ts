// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed. Use POST instead." });
  }

  // Serialize the cookie with an expired maxAge to effectively clear it
  const serializedCookie = serialize("__connectify_token_from_server", "", {
    httpOnly: true,
    secure: true,
    maxAge: -1, // Expire immediately
    path: "/",
    sameSite: 'none',
  });

  // Clear the cookie in the response header
  res.setHeader("Set-Cookie", serializedCookie);

  // Send response
  return res.status(200).json({ message: "Logged out successfully" });
}
