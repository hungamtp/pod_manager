import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdatePriceMaterialDto {
    price:number;
    material: string;
    
}

export interface UpdatePriceMaterialResponse extends ISuccessHttpResponse {
	data: UpdatePriceMaterialDto[];
}