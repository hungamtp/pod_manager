import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllOrdersFactoriesResponse extends ISuccessHttpResponse {
  data: OrderFactoryDto[];
}

export interface OrderFactoryDto {
  id: string;
  orderId: string;
  designId: string;
  productName: string;
  designName: string;
  designedImage: string;
  color: string;
  size: string;
  price: number;
  quantity: string;
  status: string;
}
