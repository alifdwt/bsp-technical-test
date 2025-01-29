"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
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
import { createInvoice } from "@/lib/api/invoice";
import { customRevalidateTag } from "@/lib/revalidate";

interface PayButtonProps {
  token: string;
  id: number;
  period: number;
  insuredPrice: number;
  premiumBase: number;
  premiumRate: number;
  transactionFee: number;
  total: number;
  tag: string;
}

const PayButton = ({
  token,
  id,
  period,
  insuredPrice,
  premiumBase,
  premiumRate,
  transactionFee,
  total,
  tag,
}: PayButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await createInvoice(token, {
      fire_product_id: id,
      period,
      insured_price: insuredPrice,
      premium_rate: premiumRate,
      premium_base: premiumBase,
      transaction_fee: transactionFee,
      total,
    })
      .then((res) => {
        console.log({
          fire_product_id: id,
          period,
          insured_price: insuredPrice,
          premium_rate: premiumRate,
          premium_base: premiumBase,
          transaction_fee: transactionFee,
          total,
        });
        if (res.statusCode === 201) {
          setShowDialog(false);
          customRevalidateTag(tag);
          toast({
            title: "Berhasil",
            description: 'Faktur berhasil terkirim"',
          });
          router.push(`/${tag}`);
        } else {
          console.error("Error res", res);
          toast({
            variant: "destructive",
            title: "Galat",
            description: res.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error catch:", error);
        toast({
          variant: "destructive",
          title: "Galat",
          description:
            error instanceof Error ? error.message : "Internal server error",
        });
      });

    setIsLoading(false);
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full">Lanjut Pembayaran</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Pembayaran akan dilanjutkan ke tim Payung Proteksi dengan segera :)
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Kembali</AlertDialogCancel>
          <Button onClick={() => handleSubmit()} disabled={isLoading}>
            {isLoading && <Loader2Icon className="animate-spin" />} Ya, saya
            yakin!
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PayButton;
