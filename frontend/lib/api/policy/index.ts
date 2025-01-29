"use server";

import { BASE_URL } from "..";

import { getSession } from "@/lib/auth/session";
import { IResponse } from "@/types/api-response";

export const createPolicy = async (invoiceCode: string) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("401 - Session is unavailable");
    }

    const response = await fetch(`${BASE_URL}/policy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        invoice_code: invoiceCode,
      }),
      next: { tags: ["policy"] },
    });

    const data: IResponse<null> = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating policy:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const removePolicy = async (code: string) => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("401 - Session is unavailable");
    }

    const response = await fetch(`${BASE_URL}/policy/${code}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { tags: ["policy"] },
    });

    const data: IResponse<null> = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing policy:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
