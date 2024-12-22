import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed. Use POST instead." });
  }

  const { token } = req.body; // Extract the token from the JSON body

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  // Max-Age for 1 day (24 hours in seconds)
  const maxAge = 60 * 60 * 24;

  res.setHeader(
    "Set-Cookie",
    `__connectify_token_from_server=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAge}`
  );

  // Send response
  return res.status(200).json({ message: "Cookie set successfully" });
}
