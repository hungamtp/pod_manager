import { CreateSizeDto, CreateSizeResponse } from "./dto/create-colors-dto";
import { API } from "@/api-client/axios";


export const createSize = async (requestData: CreateSizeDto) => {
    const { data } = await API.post<CreateSizeResponse>(
      "/size-color/size",
      requestData
    );
    return data;
  };