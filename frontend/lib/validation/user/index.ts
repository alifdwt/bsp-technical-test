import { z } from "zod";

export const useUserSchema = () => {
  return z.object({
    email: z.string().email({ message: "Invalid email address." }),
    full_name: z.string().min(1, { message: "Full name is required." }),
  });
};

export type UserFormValues = z.infer<ReturnType<typeof useUserSchema>>;

export const userInitValues: UserFormValues = {
  email: "",
  full_name: "",
};
