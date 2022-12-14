import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface ProductForFactoryDtos {
    id: string;
	name: string;
}

export interface getProductForFactoryDtos extends ISuccessHttpResponse {
	data: ProductForFactoryDtos[];
}