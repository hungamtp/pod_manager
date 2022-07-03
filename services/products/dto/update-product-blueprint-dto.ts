import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateProductBlueprintDto {
    id: string;
    frameImage: string;
    position: string;
    placeHolderTop: number;
    placeHolderHeight: number;
    placeHolderWidth: number;
}

export interface UpdateProductBlueprintResponse extends ISuccessHttpResponse {
	data: UpdateProductBlueprintDto[];
}