import { z } from "zod";

export const useBranchSchema = () => {
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
  });
};

export type BranchFormValues = z.infer<ReturnType<typeof useBranchSchema>>;

export const branchInitValues: BranchFormValues = {
  name: "",
  code: "",
};
