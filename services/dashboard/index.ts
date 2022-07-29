import { API } from "@/api-client/axios";
import { DashboardDto } from "./dto";


export const getDashboard = async () => {
   
    const { data } = await API.get<DashboardDto>(
      `/order/dashboard/admin`
    );
    return data;
  };