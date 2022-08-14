import { GetAllFactoriesDto } from "./dto/get-all-factories-dto";

import { API } from "@/api-client/axios";
import { getFactoryByIdDtos } from "./dto/get-factory-by-id-dto";
import {
  CreateCategoryResponse,
  CreateSizeColorProductDto,
} from "./dto/create-size-color-product-dto";
import { getProductForFactoryDtos } from "./dto/get-product-for-factory-dto";
import {
  CreateFactoryDto,
  CreateFactoryResponse,
} from "./dto/create-factory-dto";
import { GetAllOrdersFactoriesResponse } from "./dto/get-all-orders-factory";
import { getOrdersDetailResponse } from "./dto/get-orders-detail-dto";
import { CreatePriceMaterialDto } from "./dto/create-price-material-dto";
import {
  UpdatePriceMaterialDto,
  UpdatePriceMaterialResponse,
} from "./dto/update-price-material-dto";
import {
  UpdateOrderStatusDto,
  UpdateOrderStatusResponse,
} from "./dto/update-order-status-dto";
import {
  CancelOrderStatusDto,
  CancelOrderStatusResponse,
} from "./dto/cancel-order-status-dto";
import {
  UpdateFactoryDto,
  UpdateFactoryResponse,
} from "./dto/update-factory-dto";

export interface Filter {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
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
export const getOrdersFactory = async (
  credentialId: string,
  filter?: Filter
) => {
  const pageNumber = 0;
  const pageSize = 10;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllOrdersFactoriesResponse>(
    `/factory/order-details/${credentialId}`
  );
  return data.data;
};

export const createAccountFactory = async (requestData: CreateFactoryDto) => {
  const { data } = await API.post<CreateFactoryResponse>(
    "/factory",
    requestData
  );
  return data;
};
export const DeleteAccountFactory = async (id: string) => {
  await API.patch(`/factory/collaborating/${id}?collaborating=false`);
};

export const getFactoryById = async (id: string, filter?: Filter) => {
  const productName = filter?.search || "";
  const { data } = await API.get<getFactoryByIdDtos>(
    `/factory/${id}?productName=${productName}`
  );
  return data;
};
export const getOrderDetails = async (
  orderId: string,
  designId: string,
  credentialId: string
) => {
  const { data } = await API.get<getOrdersDetailResponse>(
    `/factory/order-details-printing?orderId=${orderId}&designId=${designId}&credentialId=${credentialId}`
  );
  return data;
};

export const getProductForFactory = async (id: string, filter?: Filter) => {
  const productName = filter?.search || "";
  const { data } = await API.get<getProductForFactoryDtos>(
    `/product/product-for-factory?factoryId=${id}&productName=${productName}`
  );
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
export const createProductPrice = async (
  factoryId: string,
  productId: string,
  requestData: CreatePriceMaterialDto
) => {
  const { data } = await API.post(
    `/factory/add-price?factoryId=${factoryId}&productId=${productId}`,
    requestData
  );
  return data;
};

export const updatePriceMaterialProduct = async (
  requestData: UpdatePriceMaterialDto,
  factoryId: string,
  productId: string
) => {
  const { data } = await API.patch<UpdatePriceMaterialResponse>(
    `/factory/update-price?factoryId=${factoryId}&productId=${productId}`,
    requestData
  );
  return data;
};

export const updateOrderStatusFactory = async (
  requestData: UpdateOrderStatusDto
) => {
  const { data } = await API.put<UpdateOrderStatusResponse>(
    `/order/update-order-status?orderStatus=${requestData.orderStatus}`,
    requestData.orderDetailId
  );
  return data;
};

export const cancelOrderStatusFactory = async (
  requestData: CancelOrderStatusDto
) => {
  const { data } = await API.put<CancelOrderStatusResponse>(
    `order/cancel`,
    requestData
  );
  return data;
};

export const updateFactory = async (requestData: UpdateFactoryDto) => {
  const { data } = await API.put<UpdateFactoryResponse>(
    `/factory/?credentialId=${requestData.id}`,
    requestData
  );
  return data;
};
