import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateCategoryDto {
    id:string;
    name: string;
    image: string;
}

export interface UpdateCategoryResponse extends ISuccessHttpResponse {
	data: UpdateCategoryDto[];
}