"use server";

import { BASE_URL } from "..";

import { FireProductFormValues } from "@/lib/validation/product/fire";
import { IFindAllResponse, IResponse } from "@/types/api-response";
import { IFireProducts } from "@/types/product/fire";

export const getFireProducts = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/fire`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["product/fire"] },
    });

    const data: IFindAllResponse<IFireProducts[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fire products:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const getFireProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/fire/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["product/fire"] },
    });

    const data: IResponse<IFireProducts> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fire product:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const createFireProduct = async (
  data: FireProductFormValues,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/product/fire`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: IResponse<IFireProducts> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating fire product:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const deleteFireProduct = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/fire/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: IResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting fire product:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
