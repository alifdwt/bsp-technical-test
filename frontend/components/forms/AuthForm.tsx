"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  //   onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_UP" | "SIGN_IN";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  //   onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: authenticate user
  };

  const buttonText = formType === "SIGN_IN" ? "Masuk" : "Daftar";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel>
                  {field.name === "email"
                    ? "Surel"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    placeholder={
                      field.name === "password"
                        ? "Kata Sandi"
                        : "Masukkan " + field.name
                    }
                    {...field}
                    // className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    className="no-focus min-h-12 rounded-lg border bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="min-h-12 w-full rounded-lg px-4 py-3"
        >
          {form.formState.isSubmitting ? "Memuat..." : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Belum punya akun?{" "}
            <Link href={"/sign-up"} className="text-primary font-semibold">
              Daftar
            </Link>
          </p>
        ) : (
          <p>
            Sudah punya akun?{" "}
            <Link href={"/sign-in"} className="text-primary font-semibold">
              Masuk
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
