import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface UpdateAccountDto {
    id:number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    roleName: string;
}

export interface UpdateAccountResponse extends ISuccessHttpResponse {
	data: UpdateAccountDto[];
}