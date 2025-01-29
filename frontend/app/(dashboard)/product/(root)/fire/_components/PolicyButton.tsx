"use client";

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { FilePlusIcon, FileXIcon } from "lucide-react";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createPolicy, removePolicy } from "@/lib/api/policy";
import { customRevalidateTag } from "@/lib/revalidate";

const PolicyButton = ({
  policyCode,
  invoiceCode,
}: {
  policyCode?: string;
  invoiceCode: string;
}) => {
  const { toast } = useToast();

  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!policyCode) {
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
    } else {
      await removePolicy(policyCode)
        .then((response) => {
          if (response.statusCode === 200) {
            customRevalidateTag("product/fire");
            toast({
              title: "Berhasil",
              description: "Polis berhasil dihapus",
            });
            setShowDialog(false);
          } else {
            console.error("Error removing policy:", response);
            toast({
              title: "Gagal",
              description: response.message,
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error("Error removing policy:", error);
          toast({
            title: "Gagal",
            description:
              error instanceof Error ? error.message : "Internal Server Error",
            variant: "destructive",
          });
        });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {policyCode ? (
        <p className="font-semibold">{policyCode}</p>
      ) : (
        <p>Belum terbit</p>
      )}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <Button
            size={"icon"}
            variant={policyCode ? "destructive" : "default"}
          >
            {policyCode ? <FileXIcon /> : <FilePlusIcon />}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              {policyCode
                ? `Polis dengan kode ${policyCode} akan dihapus!`
                : "Nomor polis akan dibuat secara otomatis ketika Anda menekan tombol 'Setuju.'"}
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
    </div>
  );
};

export default PolicyButton;
