import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateSizeColorProductDto {
	size: string;
    colorImage: string;
    quantity: number;
}[]

export interface CreateCategoryResponse extends ISuccessHttpResponse {
	data: CreateSizeColorProductDto;
}