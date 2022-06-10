import {
    GetAllCategoriesDto,
  } from "./dto/get-all-categories-dto";
  
  import { API } from "@/api-client/axios";
import { CreateCategoryDto, CreateCategoryResponse } from "./dto/create-categories-dto";
import { UpdateCategoryDto, UpdateCategoryResponse } from "./dto/update-categories-dto";
  
  export interface Filter {
    pageSize?: number;
    pageNumber?: number;
  }
  
  export const getCategories = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 5;
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
    });
    const { data } = await API.get<GetAllCategoriesDto>(
      `/category?${query.toString()}`
    );
    return data.data;
  };
  
  export const createCategory = async (requestData: CreateCategoryDto) => {
    const { data } = await API.post<CreateCategoryResponse>(
      "category",
      requestData
    );
    return data;
  };

  export const updateCategory = async (requestData: UpdateCategoryDto) => {
    const { data } = await API.put<UpdateCategoryResponse>(
      `/category/${requestData.id}`,
      requestData
    );
    return data;
  };

  export const deleteCategory = async (id: number ) => {
    await API.patch(
     `/category/${id}`,
     
   );
   
 };