"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { JWTPayload } from "jose";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MoneyInput from "@/components/ui/currency-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createFireProduct } from "@/lib/api/product/fire";
import { Session } from "@/lib/auth/session";
import { customRevalidateTag } from "@/lib/revalidate";
import {
  FireProductFormValues,
  fireProductInitValues,
  useFireProductSchema,
} from "@/lib/validation/product/fire";
import { IBuildingTypes } from "@/types/master-data/building-type";
import { IFireProducts } from "@/types/product/fire";

import CreatePolicyCode from "./CreatePolicyCode";

const constructions = [
  {
    id: 1,
    title: "Kelas I",
    description:
      "Dinding, Lantai, Dan Semua Komponen Penunjang Strukturalnya Serta Penutup Atap Terbuat Seluruhnya Dan Sepenuhnya Dari Bahan-Bahan Yang Tidak Mudah Terbakar",
  },
  {
    id: 2,
    title: "Kelas II",
    description:
      "Penutup Atap Terbuat Dari Sirap Kayu Keras, Dinding-Dinding Mengandung Bahan-Bahan Yang Dapat Terbakar Sampai Maksimum 20% Dari Luas Dinding, Lantai Dan Struktur-Struktur Penunjangnya Terbuat Dari Kayu",
  },
  {
    id: 3,
    title: "Kelas III",
    description: "Selain Konstruksi Kelas I Dan II",
  },
];

const FireProductForm = ({
  actionType,
  session,
  buildingTypes,
  data,
}: {
  actionType: "create" | "detail";
  session: Session & JWTPayload;
  buildingTypes: IBuildingTypes[];
  data?: IFireProducts;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const schema = useFireProductSchema();

  const form = useForm<FireProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: data ?? fireProductInitValues,
  });

  const submitForm = async (values: FireProductFormValues) => {
    console.log("data", values);
    try {
      await createFireProduct(values, session.accessToken).then((res) => {
        if (res.statusCode === 201) {
          customRevalidateTag("product/fire");
          toast({
            title: "Success",
            description: "Produk berhasil ditambahkan",
          });
          router.push(`/invoice/create?type=product/fire&id=${res?.data?.id}`);
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
      console.error("Error creating fire product:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Internal Server Error",
        variant: "destructive",
      });
    }
  };

  // console.log("values", form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jangka Waktu Pertanggungan</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                      disabled={actionType === "detail"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jangka Waktu Pertanggungan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* 1-10 */}
                        {[...Array(10)].map((_, index) => (
                          <SelectItem key={index} value={String(index + 1)}>
                            {index + 1} Tahun
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* building_type */}
              <FormField
                control={form.control}
                name="building_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Bangunan</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                      disabled={actionType === "detail"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Bangunan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* 1-10 */}
                        {buildingTypes.map((type) => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* price */}
              <MoneyInput
                form={form}
                label="Harga Pertanggungan"
                name="price"
                placeholder="Rp."
                disabled={actionType === "detail"}
              />
            </div>

            <FormField
              control={form.control}
              name="construction"
              render={({ field }) => (
                <FormItem className="space-y-3 md:mt-10">
                  <FormLabel>Konstruksi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={String(field.value)}
                      className="flex flex-col space-y-1"
                      disabled={actionType === "detail"}
                    >
                      {constructions.map((item) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={item.id}
                        >
                          <FormControl>
                            <RadioGroupItem value={String(item.id)} />
                          </FormControl>
                          <div>
                            <FormLabel>{item.title}</FormLabel>
                            <FormDescription>
                              {item.description}
                            </FormDescription>
                          </div>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            {/* address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Objek Pertanggungan</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={actionType === "detail"}
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* province */}
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provinsi"
                      disabled={actionType === "detail"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2 md:grid-cols-2">
              {/* city */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kota"
                        disabled={actionType === "detail"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* district */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kecamatan"
                        disabled={actionType === "detail"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* isEarthquake */}
            <FormField
              control={form.control}
              name="is_earthquake"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={actionType === "detail"}
                    />
                  </FormControl>
                  <FormLabel>Gempa Bumi</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="w-full" asChild variant={"destructive"}>
            <Link href="/product/fire">
              {actionType === "detail" ? "Kembali" : "Batal"}
            </Link>
          </Button>
          {actionType !== "detail" && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          )}
          {session.user.role === "admin" &&
            (data?.policy_code ? (
              <Button variant={"default"} className="w-full" disabled>
                Nomor Polis: {data?.policy_code}
              </Button>
            ) : (
              <CreatePolicyCode invoiceCode={data?.invoice_code} />
            ))}
        </div>
      </form>
    </Form>
  );
};

export default FireProductForm;
