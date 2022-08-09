import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateColorDto {
    id: string;
	name: string;
	imageColor: string;
}

export interface UpdateColorResponse extends ISuccessHttpResponse {
	data: UpdateColorDto[];
}