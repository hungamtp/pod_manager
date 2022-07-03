import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateAccountDto {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    roleName: string;
}

export interface UpdateImageAccountDto {
    id:string;
    image: string
}

export interface UpdateImageAccountResponse extends ISuccessHttpResponse {
	data: UpdateAccountDto[];
}

export interface UpdateAccountResponse extends ISuccessHttpResponse {
	data: UpdateAccountDto[];
}