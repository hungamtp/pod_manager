import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateProductDto {
	name: string;
    description: string;
    images: [""];
    categoryname: string;
}

export interface CreateProductResponse extends ISuccessHttpResponse {
	data: CreateProductDto[];
}