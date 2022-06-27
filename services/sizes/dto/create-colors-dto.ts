import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateSizeDto {
	name: string;
}

export interface CreateSizeResponse extends ISuccessHttpResponse {
	data: CreateSizeDto[];
}