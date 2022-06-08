import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateCategoryDto {
	name: string;
    image: string;
}

export interface CreateCategoryResponse extends ISuccessHttpResponse {
	data: CreateCategoryDto[];
}