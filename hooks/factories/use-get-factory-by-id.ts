import { Filter, getFactoryById } from "@/services/factories";
import { useQuery } from "react-query";

const useGetFactoryById = (id: string, filter: Filter) => {
  return useQuery(
    ["GetFactoryById", filter],
    async () => {
      return await getFactoryById(id, filter);
    },
    { enabled: !!id }
  );
};

export default useGetFactoryById;
