"use server";

import { InvoceFormValues } from "@/lib/validation/invoice/create";
import { IResponse } from "@/types/api-response";
import { IInvoice } from "@/types/invoice";

import { BASE_URL } from "..";

export const createInvoice = async (token: string, data: InvoceFormValues) => {
  try {
    const response = await fetch(`${BASE_URL}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: IResponse<null> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while creating invoice:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const getNextInvoiceCode = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/invoice/next-code`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: IResponse<string> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while fetching next invoice code:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const getInvoiceByCode = async (token: string, code: string) => {
  try {
    const response = await fetch(`${BASE_URL}/invoice/${code}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: IResponse<IInvoice> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error while fetching invoice by code:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
