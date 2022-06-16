import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllFactoriesDto extends ISuccessHttpResponse {
    data: {
        content: FactoryDto[],
        totalElements: number,
        totalPages: number,
        size: number,
        number: number,
    }
}

export interface FactoryDto{
    id:number;
    name: string;
    email: string;
    phone: string;
    address: string;
    location: string;
    image: string;
    collaborating: Boolean;
}