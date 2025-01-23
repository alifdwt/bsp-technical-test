"use server";

import { getSession } from "../auth/session";

import { BASE_URL } from ".";

export const deleteData = async (url: string, id: string) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(`${BASE_URL}${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: [url.replaceAll("/", "")] },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
