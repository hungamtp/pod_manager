import { API } from "@/api-client/axios";
import { DashboardDto, DashboardFactoryDto } from "./dto";


export const getDashboard = async () => {
   
    const { data } = await API.get<DashboardDto>(
      `/order/dashboard/admin`
    );
    return data;
  };
export const getFactoryDashboard = async () => {
   
    const { data } = await API.get<DashboardFactoryDto>(
      `/order/dashboard/factory`
    );
    return data;
  };