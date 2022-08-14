import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateFactoryDto {
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  tradeDiscount: number;
}

export interface CreateFactoryResponse extends ISuccessHttpResponse {
  data: CreateFactoryDto[];
}
