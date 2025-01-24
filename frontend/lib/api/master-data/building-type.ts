"use server";

import { BASE_URL } from "..";

import { BuildingTypeFormValues } from "@/lib/validation/master-data/building-type";
import { IFindAllResponse, IResponse } from "@/types/api-response";
import { IBuildingTypes } from "@/types/master-data/building-type";

export const getBuildingTypes = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/buildingtype`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["buildingtype"] },
    });

    const data: IFindAllResponse<IBuildingTypes[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching building types:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const getBuildingType = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/buildingtype/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["buildingtype"] },
    });

    const data: IResponse<IBuildingTypes> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching building type:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const createBuildingType = async (
  data: BuildingTypeFormValues,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/buildingtype`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { tags: ["buildingtype"] },
    });

    const responseData: IResponse<IBuildingTypes> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error adding building type:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

export const updateBuildingType = async (
  id: string,
  data: BuildingTypeFormValues,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/buildingtype/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      next: { tags: ["buildingtype"] },
    });

    const responseData: IResponse<IBuildingTypes> = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating building type:", error);
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};
