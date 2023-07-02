import { readFileSync } from "node:fs";
import jwt from "jsonwebtoken";

const privateKey: Buffer = readFileSync("./server.key");

interface TokenPayload {
  id: string;
  exp: number;
}

export const sign = (userId: string): string => {
  const tokenPayload: TokenPayload = {
    id: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };

  return jwt.sign(
    tokenPayload,
    privateKey.toString(), // Convert privateKey to string
    { algorithm: "RS256" }
  );
};
