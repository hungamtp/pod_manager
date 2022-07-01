import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateSizesColorsForProductDto {
	sizes: string[];
	colors: string[];
}

export interface CreateSizesColorsForProductResponse extends ISuccessHttpResponse {
	data: CreateSizesColorsForProductDto[];
}