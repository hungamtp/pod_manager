import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllColorDto extends ISuccessHttpResponse {
    data: {
        content: ColorDto[],
        totalElements: number,
        totalPages: number,
        Color: number,
        number: number,
    }
}

export interface ColorDto{
    id:string;
    imageColor: string;
    name: string;
}
export interface ColorOfProductDto{
    id:string;
    image: string;
    name: string;
}