import { CreateColorDto, CreateColorResponse } from "./dto/create-colors-dto";
import { API } from "@/api-client/axios";


export const createColor = async (requestData: CreateColorDto) => {
    const { data } = await API.post<CreateColorResponse>(
      "/size-color/color",
      requestData
    );
    return data;
  };