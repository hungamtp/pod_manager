import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateProductBlueprintDto {
   frameImage: string;
   position: string;
   placeHolderTop: number;
   placeHolderHeight: number;
   placeHolderWidth: number;
   }

export interface CreateProductBlueprintResponse extends ISuccessHttpResponse {
	data: CreateProductBlueprintDto[];
}