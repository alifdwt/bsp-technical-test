// {
//     "id": 1,
//     "period": 10,
//     "price": 500000000,
//     "construction": 1,
//     "address": "Jl. R. Khanafiah No. 17",
//     "province": "Jawa Barat",
//     "city": "Bogor",
//     "district": "Bogor Utara",
//     "is_earthquake": false,
//     "building_type_id": 1,
//     "building_type": {
//       "id": 1,
//       "code": "2976.01",
//       "name": "Rumah",
//       "rate": 0.3875
//     },
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
//     "created_at": "2025-01-27T14:04:09.194978+07:00",
//     "updated_at": "2025-01-27T14:04:09.194978+07:00"
//   }

import { IBuildingTypes } from "../master-data/building-type";
import { IUsers } from "../master-data/user";

export interface IFireProducts {
  id: number;
  period: number;
  price: number;
  construction: number;
  address: string;
  province: string;
  city: string;
  district: string;
  is_earthquake: boolean;
  building_type_id: number;
  building_type: IBuildingTypes;
  user_id: number;
  user: IUsers;
  invoice_code?: string;
  policy_code?: string;
  created_at: string;
  updated_at: string;
}
