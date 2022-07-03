import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetAllAccountsDto extends ISuccessHttpResponse {
    data: {
        content: AccountDto[],
        totalElements: number,
        totalPages: number,
        size: number,
        number: number,
    }
}

export interface AccountDto{
    id:string;
    userFirstName: string;
    userLastName: string;
    name: string;
    email: string;
    roleName: string;
    phone: string;
    address: string;
    image: string;
    userStatus: string;
}