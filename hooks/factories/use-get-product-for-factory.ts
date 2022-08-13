import { Filter, getProductForFactory } from "@/services/factories";
import { useQuery, useQueryClient } from "react-query";

const useGetProductForFactory = (id: string, filter: Filter) => {
  const queryClient = useQueryClient();

  return useQuery(["GetProductForFactory", filter], async () => {
    return await getProductForFactory(id, filter);
  });
};

export default useGetProductForFactory;
