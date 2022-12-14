import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllCategoriesDto extends ISuccessHttpResponse {
    data: {
        content: CategoryDto[],
        totalElements: number,
        totalPages: number,
        size: number,
        number: number,
    }
}

export interface CategoryDto{
    id: string;
    name: string;
    image:string;
    deleted: boolean;
}