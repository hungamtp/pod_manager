import { API } from "@/api-client/axios";
import {
  CreateMaterialDto,
  CreateMaterialResponse,
} from "./dto/create-material-dto";
import { GetAllMaterialsDto } from "./dto/get-all-material-dto";
import {
  UpdateMaterialDto,
  UpdateMaterialResponse,
} from "./dto/update-material-dto";

export interface Filter {
  pageSize?: number;
  pageNumber: number;
}

export const getMaterials = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 9;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllMaterialsDto>(
    `/material?${query.toString()}`
  );
  return data.data;
};

export const createMaterial = async (requestData: CreateMaterialDto) => {
  const { data } = await API.post<CreateMaterialResponse>(
    "/material",
    requestData
  );
  return data;
};
export const updateMaterial = async (requestData: UpdateMaterialDto) => {
  const { data } = await API.put<UpdateMaterialResponse>(
    "/material",
    requestData
  );
  return data;
};

export const deleteMaterial = async (id: string) => {
  await API.delete(`/material?id=${id}`);
};
