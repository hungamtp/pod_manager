import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreatePriceMaterialDto {
  price: string; 
  material: string;
}

export interface CreatePriceMaterialResponse extends ISuccessHttpResponse {
	data: CreatePriceMaterialDto[];
}