import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Session } from "@/lib/auth/session";

import { Button } from "../ui/button";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href={"/"} className="flex w-36">
          <Image
            src={"/assets/images/logo.svg"}
            alt="Payung Proteksi Logo"
            width={38}
            height={38}
          />
          <span className="text-lg font-extrabold leading-tight text-red-600">
            Payung Proteksi
          </span>
        </Link>

        <div className="flex w-32 justify-end gap-3">
          {session ? (
            <Button asChild>
              <Link href="/api/auth/signout">Keluar</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="rounded-full" size={"lg"}>
                <Link href={"/sign-up"}>Daftar</Link>
              </Button>
              <Button asChild className="rounded-full" size={"lg"}>
                <Link href={"/sign-in"}>Masuk</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
