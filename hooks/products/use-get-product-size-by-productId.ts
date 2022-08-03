import { getProductSizeByProductId } from "@/services/products";
import { useQuery } from "react-query";

const useGetSizeProductByProductId = (id: string) => {
  return useQuery(
    [`GetSizeProductByProductId`],
    async () => {
      return await getProductSizeByProductId(id);
    },
    { enabled: !!id }
  );
};

export default useGetSizeProductByProductId;
