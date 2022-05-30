import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { User } from "@/models/user";

export interface LoginDto {
  email: string;
  password: string;
}
export interface LoginResponse extends ISuccessHttpResponse {
  data: User;
}
