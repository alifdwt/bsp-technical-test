import { z } from "zod";

export const useBuildingTypeSchema = () => {
  return z.object({
    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .regex(/^[a-zA-Z\s.]+$/, {
        message: "Name can only contain letters and spaces.",
      }),

    code: z
      .string()
      .min(1, { message: "Code is required." })
      .max(50, { message: "Code cannot exceed 50 characters." }),
    // .regex(/^[a-zA-Z\s.]+$/, {
    //   message: "Code can only contain letters and spaces.",
    // }),
    rate: z.number().min(0, { message: "Rate must be a positive number." }),
  });
};

export type BuildingTypeFormValues = z.infer<
  ReturnType<typeof useBuildingTypeSchema>
>;

export const buildingTypeInitValues: BuildingTypeFormValues = {
  name: "",
  code: "",
  rate: 0,
};
