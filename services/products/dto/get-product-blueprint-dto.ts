import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface ProductBlueprintDto {
   id: string;
   frameImage: string;
   position: string;
   placeholder:{
    top: number;
    width: number;
    height: number;
   }

}

export interface getProductBlueprintResponse extends ISuccessHttpResponse {
	data: ProductBlueprintDto[];
}