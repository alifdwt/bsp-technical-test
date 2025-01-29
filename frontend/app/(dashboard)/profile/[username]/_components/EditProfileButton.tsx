"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateUserByUsername } from "@/lib/api/user";
import { customRevalidateTag } from "@/lib/revalidate";
import { UserFormValues, useUserSchema } from "@/lib/validation/user";
import { IUsers } from "@/types/master-data/user";
// import { useRouter } from 'next/navigation'

const EditProfileButton = ({
  username,
  token,
  user,
}: {
  username: string;
  token: string;
  user: IUsers;
}) => {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const initialValues = user;
  const schema = useUserSchema();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const submitForm = async (values: UserFormValues) => {
    await updateUserByUsername(token, username, values).then((res) => {
      if (res.statusCode === 200) {
        customRevalidateTag("user");
        toast({
          title: "Profil berhasil diperbarui",
          description: "Profil Anda berhasil diperbarui",
        });
        setDialogOpen(false);
      } else {
        console.error("Error updating user:", res);
        toast({
          title: "Gagal memperbarui profil",
          description: res.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button type="button">Edit Profil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription>
            Ubah profil Anda di sini. Klik simpan untuk menyimpan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}{" "}
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
