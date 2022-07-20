import { getOrderDetails } from "@/services/factories";
import { useQuery } from "react-query";

const useGetSizeProduct = (productId: string) => {
  return useQuery(["GetOrderDetails"], async () => {
    return await getOrderDetails(orderId, designId, credentialId);
  });
};

export default useGetSizeProduct;
