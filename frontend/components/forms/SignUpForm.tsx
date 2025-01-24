"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/api/auth/register";
import { customRevalidateTag } from "@/lib/revalidate";
import { SignUpSchema } from "@/lib/validation/auth";

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      username: "",
    },
  });

  const [preview, setPreview] = React.useState<string | null>(null);

  const formData = new FormData();
  const handleSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("full_name", data.full_name);
    formData.append("username", data.username);
    formData.append("birth_date", data.birth_date);
    formData.append(
      "profile_image",
      new File([data.profile_image], `${data.username}-profile`)
    );

    try {
      await signUp(formData).then((res) => {
        if (res.statusCode === 201) {
          customRevalidateTag("user");
          toast({
            title: "Berhasil",
            description: "Akun berhasil dibuat",
          });
          router.push("/sign-in");
        } else {
          console.error("Error registering user", res);
          toast({
            title: "Gagal",
            description: res.message,
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.error("Error registering user", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 py-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="no-focus min-h-12 rounded-lg border bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="no-focus min-h-12 rounded-lg border bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-2 md:grid-cols-3">
          {/* profile_image */}
          <div>
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-center">Profile Image</FormLabel>
                  <FormControl>
                    {/* TODO: create input file */}
                    <>
                      {/* {preview && (
                        <Button
                          onClick={() => {
                            setPreview(null);
                            form.setValue("profile_image", null);
                          }}
                          type="button"
                        >
                          X
                        </Button>
                      )} */}
                      <div className="flex items-center justify-center">
                        <div className="flex aspect-square size-full items-center justify-center rounded-xl bg-gray-100">
                          {preview ? (
                            <Image
                              src={preview}
                              alt="Profile Image"
                              className="size-36 rounded-xl object-cover"
                              width={200}
                              height={200}
                            />
                          ) : (
                            <UserIcon size={48} className="text-gray-300" />
                          )}
                        </div>
                      </div>
                      <Input
                        type="file"
                        className="w-36"
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        {...field}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </>
                  </FormControl>
                  <FormMessage className="w-32" />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 flex flex-col justify-between gap-2">
            {/* name */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="no-focus min-h-12 rounded-lg border bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="no-focus min-h-12 rounded-lg border bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* birthdate */}
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="no-focus min-h-12 rounded-lg border bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          className="min-h-12 w-full rounded-lg px-4 py-3"
        >
          {form.formState.isSubmitting ? "Memuat..." : "Daftar"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
