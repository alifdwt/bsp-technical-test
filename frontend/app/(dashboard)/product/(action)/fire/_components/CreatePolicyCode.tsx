"use client";

import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createPolicy } from "@/lib/api/policy";
import { customRevalidateTag } from "@/lib/revalidate";

const CreatePolicyCode = ({ invoiceCode }: { invoiceCode?: string }) => {
  const { toast } = useToast();

  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!invoiceCode) {
    return (
      <Button variant={"default"} className="w-full" disabled>
        Buat Nomor Polis
      </Button>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    await createPolicy(invoiceCode)
      .then((response) => {
        if (response.statusCode === 201) {
          customRevalidateTag("product/fire");
          toast({
            title: "Berhasil",
            description: "Polis berhasil dibuat",
          });
          setShowDialog(false);
        } else {
          console.error("Error creating policy:", response);
          toast({
            title: "Gagal",
            description: response.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating policy:", error);
        toast({
          title: "Gagal",
          description:
            error instanceof Error ? error.message : "Internal Server Error",
          variant: "destructive",
        });
      });
    setIsLoading(false);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button variant={"default"} className="w-full">
          Buat Nomor Polis
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            {
              "Nomor polis akan dibuat secara otomatis ketika Anda menekan tombol 'Setuju.'"
            }
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button onClick={() => handleSubmit()} disabled={isLoading}>
            Setuju
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePolicyCode;
