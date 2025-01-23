import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";

const DatatableEditButton = ({ editLink }: { editLink: string }) => {
  return (
    <Button asChild size={"icon"}>
      <Link href={editLink}>
        <PencilIcon />
      </Link>
    </Button>
  );
};

export default DatatableEditButton;
