import { API } from "@/api-client/axios";
import { LoginDto, LoginResponse } from "./dto/login.dto";

export const login = async (requestData: LoginDto) => {
  const { data } = await API.post<LoginResponse>("/auth/login", requestData);
  return data.data;
};

export const signInGoogle = async (requestData: LoginDto) => {
  const { data } = await API.post<LoginResponse>("/auth/login", requestData);
  return data.data;
};
