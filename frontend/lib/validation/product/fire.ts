import { z } from "zod";

// {
// "address": "Jl. R. Khanafiah No. 17",
// "building_type_id": 1,
// "city": "Bogor",
// "construction": 1,
// "district": "Bogor Utara",
// "is_earthquake": false,
// "period": 10,
// "price": 500000000,
// "province": "Jawa Barat",
// }
export const useFireProductSchema = () => {
  return z.object({
    address: z.string().min(1, { message: "Address is required." }),
    building_type_id: z
      .number()
      .min(1, { message: "Building Type is required." }),
    city: z.string().min(1, { message: "City is required." }),
    construction: z.number().min(1, { message: "Construction is required." }),
    district: z.string().min(1, { message: "District is required." }),
    is_earthquake: z.boolean(),
    period: z.number().min(1, { message: "Period is required." }),
    price: z.number().min(1, { message: "Price is required." }),
    province: z.string().min(1, { message: "Province is required." }),
  });
};

export type FireProductFormValues = z.infer<
  ReturnType<typeof useFireProductSchema>
>;

export const fireProductInitValues: FireProductFormValues = {
  address: "",
  building_type_id: 0,
  city: "",
  construction: 0,
  district: "",
  is_earthquake: false,
  period: 0,
  price: 0,
  province: "",
};
