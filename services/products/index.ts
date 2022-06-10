import {
    GetAllProductsDto,
  } from "./dto/get-all-products-dto";
  
  import { API } from "@/api-client/axios";
import { CreateProductDto, CreateProductResponse } from "./dto/create-products-dto";
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
  
  export const createProduct = async (requestData: CreateProductDto) => {
    const { data } = await API.post<CreateProductResponse>(
      "/product",
      requestData
    );
    return data;
  };
  
  export const deleteProduct = async (id: number ) => {
    await API.patch(
     `/product/${id}`,
     
   );
   
 };