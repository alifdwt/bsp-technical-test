"use client";

import Link from "next/link";
import React from "react";

import SignInForm from "@/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <div className="space-y-4">
      <SignInForm />
      <p>
        Belum punya akun?{" "}
        <Link href={"/sign-up"} className="text-primary font-semibold">
          Daftar
        </Link>
      </p>
    </div>
  );
}
