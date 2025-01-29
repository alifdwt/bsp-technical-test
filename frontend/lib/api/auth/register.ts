"use server";

import { IResponse } from "@/types/api-response";

import { BASE_URL } from "..";

export const signUp = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: formData,
      next: { tags: ["user"] },
    });

    const data: IResponse<null> = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "An error occurred",
      data: null,
    };
  }
};
