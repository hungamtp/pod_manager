import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateMaterialDto {
  id: string;
  name: string;
}

export interface UpdateMaterialResponse extends ISuccessHttpResponse {
  data: UpdateMaterialDto[];
}
