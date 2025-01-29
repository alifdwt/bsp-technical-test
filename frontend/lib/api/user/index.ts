"use server";

import { UserFormValues } from "@/lib/validation/user";
import { IResponse } from "@/types/api-response";
import { IUsers } from "@/types/master-data/user";

import { BASE_URL } from "..";

export const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["user"] },
    });

    const data: IResponse<IUsers> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const updateUserByUsername = async (
  token: string,
  username: string,
  data: UserFormValues
) => {
  try {
    const response = await fetch(`${BASE_URL}/user/username/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { tags: ["user"] },
    });

    const res: IResponse<null> = await response.json();
    return res;
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
