import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface SizesAndColorsMapDto {
  color: string;
  sizes: string[];
}

export interface getSizesAndColorsMap extends ISuccessHttpResponse {
  data: SizesAndColorsMapDto[];
}
