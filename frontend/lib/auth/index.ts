"use server";

import { z } from "zod";

import { BASE_URL } from "../api";
import { createSession } from "./session";
import { SignInSchema } from "../validation/auth";

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      redirectTo?: string;
    }
  | undefined;

export type LoginResponse = {
  statusCode: number;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      username: string;
      full_name: string;
      profile_image_url: string;
      birth_date: string;
      role: "admin" | "customer";
    };
    access_token: string;
    refresh_token: string;
  };
};

async function fetchWithAuth<TBody extends Record<string, unknown>, TResponse>(
  url: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Use API's error message if available
    throw new Error(
      responseData.message || `Error ${response.status}: ${response.statusText}`
    );
  }

  return responseData as TResponse;
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    type TBody = z.infer<typeof SignInSchema>;
    const result = await fetchWithAuth<TBody, LoginResponse>(
      `${BASE_URL}/auth/login`,
      validatedFields.data
    );

    const session = await createSession({
      user: {
        id: result.data.user.id,
        email: result.data.user.email,
        name: result.data.user.full_name,
        role: result.data.user.role,
        imageProfile: result.data.user.profile_image_url,
      },
      accessToken: result.data.access_token,
      refreshToken: result.data.refresh_token,
    });

    if (session.status !== "success") {
      return { message: session.message };
    }

    return {
      redirectTo: "/dashboard",
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while signing in",
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oldRefreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token" + response.statusText);
    }

    const res: LoginResponse = await response.json();
    // update session with new tokens
    const updateRes = await fetch("/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        accessToken: res.data.access_token,
        refreshToken: "",
      }),
    });
    if (!updateRes.ok) throw new Error("Failed to update the tokens");

    return res.data.access_token;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
