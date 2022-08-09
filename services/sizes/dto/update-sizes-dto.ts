import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateSizeDto {
    id: string;
	name: string;
}

export interface UpdateSizeResponse extends ISuccessHttpResponse {
	data: UpdateSizeDto[];
}