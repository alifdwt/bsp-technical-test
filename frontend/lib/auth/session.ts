"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export type Session = {
  user: {
    id: number;
    email: string;
    username: string;
    name: string;
    role: "admin" | "customer";
    imageProfile: string;
  };
  accessToken: string;
  refreshToken?: string;
};

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedKey);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });

  return {
    status: "success",
    message: "Session created!",
  };
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify<Session>(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (err) {
    console.error("Failed to verify the session", err);
    redirect("/sign-in");
  }
}

export async function deleteSession() {
  await cookies().delete("session");
  await cookies().delete("onBoardingAccessToken");
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    ...payload,
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
