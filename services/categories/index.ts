import {
    GetAllCategoriesDto,
  } from "./dto/get-all-categories-dto";
  
  import { API } from "@/api-client/axios";
  
  export interface Filter {
    pageSize?: number;
    pageNumber?: number;
  }
  
  export const getCategories = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 9;
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
    });
    const { data } = await API.get<GetAllCategoriesDto>(
      `/category?${query.toString()}`
    );
    return data.data;
  };
  
 