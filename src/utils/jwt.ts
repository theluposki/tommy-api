import { readFileSync } from "node:fs";
import jwt, { VerifyOptions } from "jsonwebtoken";

const privateKey: Buffer = readFileSync("./server.key");
const publicKey: Buffer = readFileSync('server.key');

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

export const verify = (token: string): string | object => {
  const options: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return jwt.verify(token, publicKey.toString(), options);
};
