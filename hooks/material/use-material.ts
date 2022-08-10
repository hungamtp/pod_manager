import { useQuery } from "react-query";
import { getSizes, Filter } from "@/services/products";
import { getMaterials } from "@/services/material";

const useMaterial = (filter: Filter) => {
  return useQuery(["Material", filter], async () => {
    return await getMaterials(filter);
  });
};

export default useMaterial;
