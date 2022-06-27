import { GetAllFactoriesDto } from "./dto/get-all-factories-dto";

import { API } from "@/api-client/axios";
import { getFactoryByIdDtos } from "./dto/get-factory-by-id-dto";
import {
  CreateCategoryResponse,
  CreateSizeColorProductDto,
} from "./dto/create-size-color-product-dto";

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

export const getFactoryById = async (id: number) => {
  const { data } = await API.get<getFactoryByIdDtos>(`/factory/${id}`);
  return data;
};

export const createSizeColorProduct = async (
  requestData: CreateSizeColorProductDto[],
  factoryId: string,
  productId: string
) => {
  const { data } = await API.post<CreateCategoryResponse>(
    `/factory/add-size-color?factoryId=${factoryId}&productId=${productId}`,
    requestData
  );
  return data;
};
