import { useMutation, useQueryClient } from "react-query";

import { createProductPrice } from "@/services/factories";

const useCreateProductPrice = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (price: number) => {
      return await createProductPrice(factoryId, productId, price);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("GetProductForFactory");
        queryClient.invalidateQueries("GetFactoryById");
      },
    }
  );
};

export default useCreateProductPrice;
