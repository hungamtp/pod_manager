import { getColorSize } from "@/services/products";
import { useQuery } from "react-query";

const useColorSize = (productId: string) => {
  return useQuery(["ColorSizeList"], async () => {
    return await getColorSize(productId);
  });
};

export default useColorSize;
