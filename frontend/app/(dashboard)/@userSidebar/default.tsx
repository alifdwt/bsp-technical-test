import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

function Default() {
  return (
    <>
      <Button asChild variant={"outline"}>
        <Link href="/dashboard/profile">Profil</Link>
      </Button>
      <Button asChild variant={"destructive"}>
        <Link href="/api/auth/signout">Keluar</Link>
      </Button>
    </>
  );
}

export default Default;
