import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CancelOrderStatusDto {
  orderId: string;
  cancelReason: string;
  orderStatus: string;
}

export interface CancelOrderStatusResponse extends ISuccessHttpResponse {
  data: CancelOrderStatusDto[];
}
