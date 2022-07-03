import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface FactoryByIdDtos {
    id: string;
	name: string;
	email: string;
    location: string;
    address: string;
    phone: number;
    image: string;
    productDtoList: {
        id: string;
        name: string;
        description: string;
        productImages: {image: string}[];
        categoryName: string;
        sizeColors: {
            quantity: number;
            size: string;
            colorImage: string;
        }[]
    }[]
    public: Boolean;
    delete: Boolean;
}

export interface getFactoryByIdDtos extends ISuccessHttpResponse {
	data: FactoryByIdDtos;
}