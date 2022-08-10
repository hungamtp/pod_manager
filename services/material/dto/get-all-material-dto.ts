import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllMaterialsDto extends ISuccessHttpResponse {
  data: {
    content: MaterialDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

export interface MaterialDto {
  id: string;
  name: string;
}
