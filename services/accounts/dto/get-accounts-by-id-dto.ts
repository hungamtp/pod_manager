import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface AccountByIdDtos {
    id: number;
	userFirstName: string;
    userLastName: string;
    name: string,
    email: string;
    roleName: string;
    phone: number;
    address: string;
    image: string;
    userStatus: string;
}

export interface getAccountByIdResponse extends ISuccessHttpResponse {
	data: AccountByIdDtos;
}