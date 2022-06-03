import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface CreateAccountDto {
	userFirstName: string;
  userLastName: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  roleName: string;
}

export interface CreateAccountResponse extends ISuccessHttpResponse {
	data: CreateAccountDto[];
}