import { CreateSizeDto, CreateSizeResponse } from "./dto/create-sizes-dto";
import { API } from "@/api-client/axios";
import { UpdateSizeDto, UpdateSizeResponse } from "./dto/update-sizes-dto";


export const createSize = async (requestData: CreateSizeDto) => {
    const { data } = await API.post<CreateSizeResponse>(
      "/size-color/size",
      requestData
    );
    return data;
  };
export const updateSize = async (requestData: UpdateSizeDto) => {
    const { data } = await API.put<UpdateSizeResponse>(
      "/size-color/size",
      requestData
    );
    return data;
  };