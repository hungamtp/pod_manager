import {
    GetAllAccountsDto,
  } from "./dto/get-all-accounts-dto";
  
  import { API } from "@/api-client/axios";
import { CreateAccountDto, CreateAccountResponse } from "./dto/create-accounts-dto";
import { UpdateAccountDto, UpdateAccountResponse, UpdateImageAccountDto, UpdateImageAccountResponse } from "./dto/update-accounts-dto";
import { getProductByIdDtos } from "../products/dto/get-products-by-id-dto";
import { AccountByIdDtos , getAccountByIdResponse } from "./dto/get-accounts-by-id-dto";
  
  export interface Filter {
    searchValues?: string;
    searchCriteria?: string;
    pageSize?: number;
    pageNumber?: number;
  }
  
  export const getAccounts = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 9;
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
    });
    const { data } = await API.get<GetAllAccountsDto>(
      `/user?${query.toString()}`
    );
    return data.data;
  };

  export const getAccountsByRoleName = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 9;
    const roleName = "";
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
      roleName: filter?.searchValues || roleName,
    });
    const { data } = await API.get<GetAllAccountsDto>(
      `/user/role?${query.toString()}`
    );
    return data.data;
  };

  export const getAccountById = async (id: number) => {
    const { data } = await API.get<getAccountByIdResponse>(
      `/user/admin/${id}`
    );
    return data;
  };

  
  export const createAccountUser = async (requestData: CreateAccountDto) => {
    const { data } = await API.post<CreateAccountResponse>(
      "/user",
      requestData
    );
    return data;
  };
  export const createAccountFactory = async (requestData: CreateAccountDto) => {
    const { data } = await API.post<CreateAccountResponse>(
      "user/addFactory",
      requestData
    );
    return data;
  };
  export const createAccountAdmin = async (requestData: CreateAccountDto) => {
    const { data } = await API.post<CreateAccountResponse>(
      "/user/addAdmin",
      requestData
    );
    return data;
  };
  
  export const updateAccount = async (requestData: UpdateAccountDto) => {
    const { data } = await API.put<UpdateAccountResponse>(
      `/user/update-by-admin/${requestData.id}`,
      requestData
    );
    return data;
  };

  export const deleteAccount = async (id: number ) => {
     await API.patch(
      `/user/${id}`,
    );
  };

  export const updateImageAccount = async (requestData: UpdateImageAccountDto ) => {
    await API.patch<UpdateImageAccountResponse>(
     `/user/avatar/${requestData.id}`,
     requestData
   );
 };
  // export const getAccount = async (id: string) => {
  //   const { data } = await API.get<GetAccountsResponse>(
  //     `/user?pageNum=0&pageSize=10&sort=usernameASC&search=id:${id}`
  //   );
  //   return data.data;
  // };
  
  // export const getAccountById = async (id: string) => {
  //   const { data } = await API.get<GetAccountResponse>(`/user/${id}`);
  //   return data.data;
  // };
  
  // export const getAccountByCampaignId = async (id: string) => {
  //   const { data } = await API.get<GetAccountsByCampaignIdResponse>(
  //     `user/usersInCampaign/${id}`
  //   );
  //   return data.data;
  // };
  
  // export const getDonatorByCampaignId = async (id: string) => {
  //   const { data } = await API.get<GetAccountsByCampaignIdResponse>(
  //     `user/donatorInCampaign/${id}`
  //   );
  //   return data.data;
  // };
  
  // export const getAllDonators = async (filter?: Filter) => {
  //   const pageNum = 0;
  //   const pageSize = 9;
  //   const query = new URLSearchParams({
  //     pageNum: pageNum.toString(),
  //     pageSize: pageSize.toString(),
  //     // search: `fullName:${filter?.fullName}&phone:${filter?.phone}&email:${filter?.email}`,
  //     // search: `phone:${filter?.phone}`,
  //     search: "",
  
  //     sort: "usernameASC",
  //   });
  //   const { data } = await API.get<GetAccountsResponse>(
  //     `/user?${query.toString()}`
  //   );
  //   return data.data;
  // };
  