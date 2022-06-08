import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllProductsDto extends ISuccessHttpResponse {
    data: {
        content: ProductDto[],
        totalElements: number,
        totalPages: number,
        size: number,
        number: number,
    }
}

export interface ProductDto{
    id:number;
    name: string;
    productImages: {image: string}[];
    categoryName: string;
    tags: [];
    numberOfSize: number;
    numberOfColor: number;
    numberOfFactory: number;
}