import {
    GetAllProductsDto, GetColors, GetSizes,
  } from "./dto/get-all-products-dto";
  
  import { API } from "@/api-client/axios";
import { CreateProductDto, CreateProductResponse } from "./dto/create-products-dto";
import { UpdateProductDto, UpdateProductResponse } from "./dto/update-product-dto";
import { getProductByIdDtos } from "./dto/get-products-by-id-dto";
import { getSizesAndColors } from "./dto/get-all-size-color-by-id";
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

  export const getSizes = async () => {
    const { data } = await API.get<GetSizes>(
      `/size-color/size`
    );
    return data;
  };
  export const getColors = async () => {
    const { data } = await API.get<GetColors>(
      `/size-color/color`
    );
    return data;
  };

  export const getProductById = async (id: number) => {
    const { data } = await API.get<getProductByIdDtos>(
      `/product/admin/${id}`
    );
    return data;
  };

  export const getSizesAndColorsById = async (id: number) => {
    const { data } = await API.get<getSizesAndColors>(
      `/product/admin/size-color/${id}`
    );
    return data;
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

 export const updateProduct = async (requestData: UpdateProductDto) => {
  const { data } = await API.put<UpdateProductResponse>(
    `/product/${requestData.id}`,
    requestData
  );
  return data;
};

export const publishProduct = async (id: number ) => {
  await API.patch(
   `/product/publish/${id}`,
   
 );
};
export const unPublishProduct = async (id: number ) => {
  await API.patch(
   `/product/un-publish/${id}`,
 );
};