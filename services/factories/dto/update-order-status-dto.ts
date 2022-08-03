import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateOrderStatusDto {
    orderDetailId: string[];
    orderStatus: string;
}

export interface UpdateOrderStatusResponse extends ISuccessHttpResponse {
	data: UpdateOrderStatusDto[];
}