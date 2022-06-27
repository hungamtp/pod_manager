import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateColorDto {
	name: string;
}

export interface CreateColorResponse extends ISuccessHttpResponse {
	data: CreateColorDto[];
}