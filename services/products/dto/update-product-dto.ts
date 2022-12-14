import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateProductDto {
    id:string;
    name: string;
    description: string;
    images: string[];
    categoryName: string;
}

export interface UpdateProductResponse extends ISuccessHttpResponse {
	data: UpdateProductDto[];
}