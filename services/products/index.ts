import { GetAllProductsDto } from "./dto/get-all-products-dto";

import { API } from "@/api-client/axios";
import {
  CreateProductDto,
  CreateProductResponse,
} from "./dto/create-products-dto";
import {
  UpdateProductDto,
  UpdateProductResponse,
} from "./dto/update-product-dto";
import { getProductByIdDtos } from "./dto/get-products-by-id-dto";
import { getSizesAndColors } from "./dto/get-all-size-color-by-id";
import { GetAllSizesDto } from "./dto/get-all-size-dto";
import { GetAllColorDto } from "./dto/get-all-colors-dtos";
import {
  CreateSizesColorsForProductDto,
  CreateSizesColorsForProductResponse,
} from "./dto/create-size-color-for-product-dto";
import { getProductBlueprintResponse } from "./dto/get-product-blueprint-dto";
import {
  CreateProductBlueprintDto,
  CreateProductBlueprintResponse,
} from "./dto/create-products-blueprint-dto";
import {
  UpdateProductBlueprintDto,
  UpdateProductBlueprintResponse,
} from "./dto/update-product-blueprint-dto";
import { ProductSizeDto } from "./dto/product-size-dto";
import { Search } from "@material-ui/icons";
import { getSizesAndColorsMap } from "./dto/get-all-color-size-map";
// import { CreateAccountDto, CreateAccountResponse } from "./dto/create-accounts-dto";

export interface Filter {
  pageSize?: number;
  pageNumber: number;
  sort?: string;
  search?: string;
  searchValues?: string;
}

export const getProducts = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 9;
  const sort = "createDate";
  const search = filter?.search || "";
  const searchValues = filter?.searchValues || "";
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllProductsDto>(
    `/product/admin?${query.toString()}&search=${searchValues}:${search}&sort=${sort}`
  );
  return data.data;
};

export const getSizes = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 9;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllSizesDto>(
    `/size-color/sizes?${query.toString()}`
  );
  return data.data;
};

export const getColorSize = async (productId: string) => {
  const { data } = await API.get<getSizesAndColorsMap>(
    `/product/size-color-raw/${productId}`
  );
  return data.data;
};

export const getColors = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 9;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllColorDto>(
    `/size-color/colors?${query.toString()}`
  );
  return data.data;
};

export const getProductBlueprint = async (id: string) => {
  const { data } = await API.get<getProductBlueprintResponse>(
    `/product/design/${id}`
  );
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await API.get<getProductByIdDtos>(`/product/admin/${id}`);
  return data;
};

export const getSizesAndColorsById = async (id: string) => {
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
export const createProductBluePrint = async (
  requestData: CreateProductBlueprintDto,
  id: string
) => {
  const { data } = await API.post<CreateProductBlueprintResponse>(
    `/product/blueprint?productId=${id}`,
    requestData
  );
  return data;
};
export const createSizesColorsForProduct = async (
  requestData: CreateSizesColorsForProductDto,
  id: string
) => {
  const { data } = await API.post<CreateSizesColorsForProductResponse>(
    `/product/size-color/${id}`,
    requestData
  );
  return data;
};

export const deleteProduct = async (id: string) => {
  await API.patch(`/product/${id}`);
};

export const updateProduct = async (requestData: UpdateProductDto) => {
  const { data } = await API.put<UpdateProductResponse>(
    `/product/${requestData.id}`,
    requestData
  );
  return data;
};
export const updateProductBlueprint = async (
  requestData: UpdateProductBlueprintDto
) => {
  const { data } = await API.put<UpdateProductBlueprintResponse>(
    `/product/blueprint?blueprintId=${requestData.id}`,
    requestData
  );
  return data;
};

export const publishProduct = async (id: string) => {
  await API.patch(`/product/publish/${id}`);
};
export const unPublishProduct = async (id: string) => {
  await API.patch(`/product/un-publish/${id}`);
};

export const addProductSize = async (submitValue: {
  size: string;
  width: number;
  height: number;
  productId: string;
}) => {
  const { data } = await API.post(`/size-product`, submitValue);
  return data;
};

export const updateProductSize = async (submitValue: {
  size: string;
  width: number;
  height: number;
  id: string;
}) => {
  const { data } = await API.put(`/size-product`, submitValue);
  return data;
};

export const getProductSizeByProductId = async (productId: string) => {
  const { data } = await API.get<ProductSizeDto[]>(
    `/size-product/${productId}`
  );
  return data;
};
