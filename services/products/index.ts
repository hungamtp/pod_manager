import {
    GetAllProductsDto,
  } from "./dto/get-all-products-dto";
  
  import { API } from "@/api-client/axios";
// import { CreateAccountDto, CreateAccountResponse } from "./dto/create-accounts-dto";
  
  export interface Filter {
    pageSize?: number;
    pageNumber?: number;
    sort?: string;
    search?: string;
  }
  
  export const getProducts = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 9;
    const sort = "";
    const search = "";
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
      sort: filter?.sort || sort.toString(),
      search: filter?.search || search.toString(),
    });
    const { data } = await API.get<GetAllProductsDto>(
      `/product/admin?${query.toString()}`
    );
    return data.data;
  };
  
  // export const createAccountUser = async (requestData: CreateAccountDto) => {
  //   const { data } = await API.post<CreateAccountResponse>(
  //     "/user",
  //     requestData
  //   );
  //   return data;
  // };
  // export const createAccountFactory = async (requestData: CreateAccountDto) => {
  //   const { data } = await API.post<CreateAccountResponse>(
  //     "user/addFactory",
  //     requestData
  //   );
  //   return data;
  // };
  // export const createAccountAdmin = async (requestData: CreateAccountDto) => {
  //   const { data } = await API.post<CreateAccountResponse>(
  //     "/user/addAdmin",
  //     requestData
  //   );
  //   return data;
  // };
  
  // export const updateRole = async (requestData: UpdateAccountDto) => {
  //   const { data } = await API.put<UpdateUserResponse>(
  //     `/user/${requestData.userId}?roleId=${requestData.role}`
  //   );
  //   return data;
  // };
  
  // export const updatePassword = async (requestData: UpdateAccountDto) => {
  //   const { data } = await API.post<UpdateUserResponse>(
  //     `/auth/changePassword`,
  //     requestData
  //   );
  //   console.log(data, "changePassworddddddddd");
  //   return data;
  // };
  
  // export const updateAccount = async (requestData: UpdateAccountDto) => {
  //   const { data } = await API.put<UpdateUserResponse>(
  //     `/user/update/${requestData.userId}`,
  //     requestData
  //   );
  //   return data;
  // };
  
 