import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponse extends ISuccessHttpResponse {
  data: LoginDto;
}
