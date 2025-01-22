"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth";

const SignInForm = () => {
  const [state, action] = useFormState(signIn, undefined);
  const router = useRouter();

  const { toast } = useToast();

  const [hasRedirected, setHasRedirected] = useState(false);
  //   const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state?.redirectTo && !hasRedirected) {
      setHasRedirected(true);
      setIsSuccess(true);
      router.push(state.redirectTo);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali",
      });
    }
  }, [state?.redirectTo, hasRedirected, router, toast]);

  return (
    <form action={action} className="mt-10 space-y-6">
      <div className="flex w-full flex-col gap-2.5">
        <Label htmlFor="email">Surel</Label>
        <Input
          type="email"
          placeholder="Masukkan surel Anda"
          name="email"
          className="no-focus min-h-12 rounded-lg border bg-white"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>
      <div>
        <div className="flex w-full flex-col gap-2.5">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            type={"password"}
            placeholder="Masukkan kata sandi Anda"
            name="password"
            className="no-focus min-h-12 rounded-lg border bg-white"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">
              {state.errors.password.join(", ")}
            </p>
          )}
        </div>
      </div>

      {state?.message && (
        <p className="max-w-[300px] text-sm text-red-500">{state.message}</p>
      )}

      <LoginButton isSuccess={isSuccess} />
    </form>
  );
};

export default SignInForm;

export function LoginButton({ isSuccess }: { isSuccess?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      disabled={pending || isSuccess}
      type="submit"
      className="mt-4 w-full"
    >
      {pending ? (
        <>
          <Loader2Icon className="mr-2 size-4 animate-spin" />
          <span>Memuat...</span>
        </>
      ) : (
        "Masuk"
      )}
    </Button>
  );
}
