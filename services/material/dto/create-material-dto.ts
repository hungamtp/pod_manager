import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateMaterialDto {
  name: string;
}

export interface CreateMaterialResponse extends ISuccessHttpResponse {
  data: CreateMaterialDto[];
}
