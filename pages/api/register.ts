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

  const { token } = req.body; // Extract the token from the JSON body

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  // Serialize the cookie
  const serializedCookie = serialize("__connectify_token_from_server", token, {
    httpOnly: true, // Ensure the cookie is accessible only through HTTP requests (not JS)
    secure: true, // Use secure cookie for production
    maxAge: 1000 * 60 * 60 * 24,
    path: "/", // Cookie available across the entire site
    sameSite: 'none', // Prevent CSRF attacks
  });

  // Set the cookie in the response header
  res.setHeader("Set-Cookie", serializedCookie);

  // Send response
  return res.status(200).json({ message: "Cookie set successfully" });
}

