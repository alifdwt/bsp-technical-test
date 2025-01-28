// {
//     "id": 1,
//     "code": "K.001.00001",
//     "period": 3,
//     "insured_price": 690000000,
//     "premium_rate": 0.69,
//     "premium_base": 1428300,
//     "transaction_fee": 10000,
//     "total": 1438300,
//     "user_id": 2,
//     "user": {
//       "id": 2,
//       "username": "alifdwt",
//       "full_name": "Alif Dewantara",
//       "email": "aputradewantara@gmail.com",
//       "password": "$2a$10$H.2mbUCOVs57LE7uTWToE.04XcX0PypQyH7akaLXkOhUNch5xucu.",
//       "birth_date": "1999-06-08T07:00:00+07:00",
//       "profile_image_url": "https://res.cloudinary.com/dxirtmo5t/image/upload/v1737472832/Kutipanda/User/alif-dewantara-1.jpg",
//       "role": "customer",
//       "created_at": "2025-01-21T22:20:32.78011+07:00",
//       "updated_at": "2025-01-21T22:20:32.78011+07:00"
//     },
//     "fire_product_id": 1,
//     "fire_product": {
//       "id": 1,
//       "period": 3,
//       "price": 690000000,
//       "construction": 1,
//       "address": "Reaksi Office, Jl. Palayu Raya No.2, RT.5/RW.10, Tegal Gundil, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16152",
//       "province": "Jawa Barat",
//       "city": "Bogor",
//       "district": "Bogor Utara",
//       "is_earthquake": false,
//       "building_type_id": 3,
//       "building_type": {
//         "id": 0,
//         "code": "",
//         "name": "",
//         "rate": 0
//       },
//       "user_id": 2,
//       "user": {
//         "id": 0,
//         "username": "",
//         "full_name": "",
//         "email": "",
//         "password": "",
//         "birth_date": "0001-01-01T00:00:00Z",
//         "profile_image_url": "",
//         "role": "",
//         "created_at": "0001-01-01T00:00:00Z",
//         "updated_at": "0001-01-01T00:00:00Z"
//       },
//       "invoice_code": "K.001.00001",
//       "policy_code": "",
//       "created_at": "2025-01-28T14:28:07.981545+07:00",
//       "updated_at": "2025-01-28T19:04:28.013437+07:00"
//     },
//     "created_at": "2025-01-28T19:04:28.003689+07:00",
//     "updated_at": "2025-01-28T19:04:28.003689+07:00"
//   },

import { IUsers } from "../master-data/user";
import { IFireProducts } from "../product/fire";

export interface IInvoice {
  id: number;
  code: string;
  period: number;
  insured_price: number;
  premium_rate: number;
  premium_base: number;
  transaction_fee: number;
  total: number;
  user_id: number;
  user: IUsers;
  fire_product_id: number;
  fire_product: IFireProducts;
  created_at: string;
  updated_at: string;
}
