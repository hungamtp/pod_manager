import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateFactoryDto {
  id: string;
  name: string;
  tradeDiscount: number;
  phone: string;
  address: string;
}

export interface UpdateFactoryResponse extends ISuccessHttpResponse {
  data: UpdateFactoryDto[];
}
