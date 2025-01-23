"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

import { useToast } from "@/hooks/use-toast";
import { deleteData } from "@/lib/api/api";
import { customRevalidateTag } from "@/lib/revalidate";

const DatatableDeleteButton = ({
  deleteLink,
  id,
}: {
  deleteLink: string;
  id: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteData(deleteLink, id).then((res) => {
        if (res.statusCode === 200) {
          customRevalidateTag(deleteLink);
          toast({
            title: "Success",
            description: "Data berhasil dihapus",
          });
          setOpen(false);
        } else {
          console.error("Error deleting data:", res);
          toast({
            title: "Error",
            description: "Data gagal dihapus",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      toast({
        title: "Error",
        description: "Data gagal dihapus",
      });
    }
    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin ingin menghapus data ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Data yang sudah dihapus tidak dapat dikembalikan {deleteLink}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <Loader2Icon className="mr-2 animate-spin" />}
            {loading ? "Menghapus..." : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DatatableDeleteButton;
