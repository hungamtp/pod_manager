import { getProductSizeByProductId } from "@/services/products";
import { useQuery } from "react-query";

const useGetSizeProductByProductId = (id: string) => {
  return useQuery([`GetSizeProductByProductId${id}`], async () => {
    return await getProductSizeByProductId(id);
  });
};

export default useGetSizeProductByProductId;
