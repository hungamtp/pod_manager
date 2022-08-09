import { CreateColorDto, CreateColorResponse } from "./dto/create-colors-dto";
import { API } from "@/api-client/axios";
import { UpdateColorDto, UpdateColorResponse } from "./dto/update-colors-dto";


export const createColor = async (requestData: CreateColorDto) => {
    const { data } = await API.post<CreateColorResponse>(
      "/size-color/color",
      requestData
    );
    return data;
  };

  export const updateColor = async (requestData: UpdateColorDto) => {
    const { data } = await API.put<UpdateColorResponse>(
      "/size-color/color",
      requestData
    );
    return data;
  };