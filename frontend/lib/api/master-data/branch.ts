"use server";

import { BASE_URL } from "..";

import { BranchFormValues } from "@/lib/validation/master-data/branch";
import { IFindAllResponse, IResponse } from "@/types/api-response";
import { IBranches } from "@/types/master-data/branch";

export const getBranches = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/branch`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["branch"] },
    });

    const data: IFindAllResponse<IBranches[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const getBranch = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/branch/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["branch"] },
    });

    const data: IResponse<IBranches> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching branch:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const createBranch = async (data: BranchFormValues, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/branch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { tags: ["branch"] },
    });

    const responseData: IResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating branch:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const updateBranch = async (
  id: string,
  data: BranchFormValues,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/branch/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { tags: ["branch"] },
    });

    const responseData: IResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating branch:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const deleteBranch = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/branch/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["branch"] },
    });

    const responseData: IResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting branch:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
