import { getOrderDetails } from "@/services/factories";
import { useQuery } from "react-query";

const useGetOrderDetails = (
  orderId: string,
  designId: string,
  credentialId: string
) => {
  return useQuery(
    ["GetOrderDetails"],
    async () => {
      return await getOrderDetails(orderId, designId, credentialId);
    },
    { enabled: !!orderId && !!designId && !!credentialId }
  );
};

export default useGetOrderDetails;
