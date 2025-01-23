"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
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
import {
  createBuildingType,
  updateBuildingType,
} from "@/lib/api/master-data/building-type";
import { customRevalidateTag } from "@/lib/revalidate";
import {
  BuildingTypeFormValues,
  buildingTypeInitValues,
  useBuildingTypeSchema,
} from "@/lib/validation/building-type";
import { IBuildingTypes } from "@/types/master-data/building-type";

const BuildingTypeForm = ({
  formType,
  token,
  data,
}: {
  formType: "add" | "edit";
  token: string;
  data?: IBuildingTypes;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const initialValues =
    formType === "edit" && data ? data : buildingTypeInitValues;
  const schema = useBuildingTypeSchema();

  const form = useForm<BuildingTypeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const submitForm = async (values: BuildingTypeFormValues) => {
    console.log("data", values);
    if (formType === "add") {
      try {
        await createBuildingType(values, token).then((res) => {
          if (res.statusCode === 201) {
            customRevalidateTag("buildingtype");
            toast({
              title: "Success",
              description: "Jenis bangunan berhasil ditambahkan",
            });
            router.push("/master-data/building-type");
          } else {
            console.log("res", res);
            toast({
              title: "Error",
              description: res.message,
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        console.error("Error creating building type:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Internal Server Error",
          variant: "destructive",
        });
      }
    } else {
      try {
        await updateBuildingType(String(data?.id), values, token).then(
          (res) => {
            if (res.statusCode === 200) {
              customRevalidateTag("buildingtype");
              toast({
                title: "Success",
                description: "Jenis bangunan berhasil diperbarui",
              });
              router.push("/master-data/building-type");
            } else {
              console.log("res", res);
              toast({
                title: "Error",
                description: res.message,
                variant: "destructive",
              });
            }
          }
        );
      } catch (error) {
        console.error("Error updating building type:", error);
        toast({
          title: "Error",
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
          {/* code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode</FormLabel>
                <FormControl>
                  <Input placeholder="Kode bangunan" {...field} />
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
                  <Input placeholder="Nama bangunan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* rate */}
          <FormField
            control={form.control}
            name="rate"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Tarif</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Tarif"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                  />
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

export default BuildingTypeForm;
