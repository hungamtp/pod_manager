import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllSizesDto extends ISuccessHttpResponse {
    data: {
        content: SizeDto[],
        totalElements: number,
        totalPages: number,
        size: number,
        number: number,
    }
}

export interface SizeDto{
    id:string;
    name: string;
   
}