import { decodeJwt } from "jose";

export function getDecodedToken(token: string) {
  const decoded = decodeJwt(token);
  return decoded;
}
