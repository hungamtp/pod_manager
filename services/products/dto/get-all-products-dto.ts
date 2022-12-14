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
export interface GetSizes extends ISuccessHttpResponse {
    data: {name: string}[]
}

export interface GetColors extends ISuccessHttpResponse {
    data: {name: string}[]
}

export interface ProductDto{
    id:string;
    name: string;
    productImages: {image: string}[];
    categoryName: string;
    description: string;
    productTags: ProductTagDto[];
    priceByFactories: number;
    public: boolean;
    deleted: boolean;
}
export interface ProductTagDto{
    tag: {
        name: string;
    }
}
