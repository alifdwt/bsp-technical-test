"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { createBranch, updateBranch } from "@/lib/api/master-data/branch";
import { customRevalidateTag } from "@/lib/revalidate";
import {
  BranchFormValues,
  branchInitValues,
  useBranchSchema,
} from "@/lib/validation/master-data/branch";
import { IBranches } from "@/types/master-data/branch";

const BranchForm = ({
  formType,
  token,
  data,
}: {
  formType: "add" | "edit";
  token: string;
  data?: IBranches;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const initialValues = formType === "edit" && data ? data : branchInitValues;
  const schema = useBranchSchema();

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const submitForm = async (values: BranchFormValues) => {
    console.log("data", values);
    if (formType === "add") {
      try {
        await createBranch(values, token).then((res) => {
          if (res.statusCode === 201) {
            customRevalidateTag("branch");
            toast({
              title: "Berhasil",
              description: "Cabang berhasil ditambahkan",
            });
            router.push("/master-data/branch");
          } else {
            toast({
              title: "Gagal",
              description: res.message,
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        console.error("Error creating branch:", error);
        toast({
          title: "Gagal",
          description:
            error instanceof Error ? error.message : "Internal Server Error",
          variant: "destructive",
        });
      }
    } else {
      try {
        await updateBranch(String(data?.id), values, token).then((res) => {
          if (res.statusCode === 200) {
            customRevalidateTag("branch");
            toast({
              title: "Berhasil",
              description: "Cabang berhasil diperbarui",
            });
            router.push("/master-data/branch");
          } else {
            toast({
              title: "Gagal",
              description: res.message,
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        console.error("Error updating branch:", error);
        toast({
          title: "Gagal",
          description:
            error instanceof Error ? error.message : "Internal Server Error",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode</FormLabel>
                <FormControl>
                  <Input placeholder="Kode cabang" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Nama cabang" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Loader2Icon className="animate-spin" />
          )}
          {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
};

export default BranchForm;
