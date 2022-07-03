import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface SizesAndColorsDto {
   sizes: string[];
   colors: {
      id: string,
      name: string,
      image: string, 
   }[];

}

export interface getSizesAndColors extends ISuccessHttpResponse {
	data: SizesAndColorsDto;
}