import {
    GetAllFactoriesDto,
  } from "./dto/get-all-factories-dto";
  
  import { API } from "@/api-client/axios";
  
  export interface Filter {
    pageSize?: number;
    pageNumber?: number;
  }
  
  export const getFactories = async (filter?: Filter) => {
    const pageNumber = 0;
    const pageSize = 10;
    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
    });
    const { data } = await API.get<GetAllFactoriesDto>(
      `/factory?${query.toString()}`
    );
    return data.data;
  };
  
 