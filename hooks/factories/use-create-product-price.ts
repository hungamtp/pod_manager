import { useMutation, useQueryClient } from "react-query";

import { createProductPrice } from "@/services/factories";
import { useSnackbar } from 'notistack';

const useCreateProductPrice = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string,
) => {
	const { enqueueSnackbar } = useSnackbar();
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
        const message = "Create successfully!";
        enqueueSnackbar(message, {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
    }
  );
};

export default useCreateProductPrice;
