import { useMutation, useQueryClient } from "react-query";

import { createProductPrice } from "@/services/factories";
import { useSnackbar } from 'notistack';
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

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
      },onError: (error: AxiosError<ErrorHttpResponse>) => {
				if (error) {
        handleCloseDialog();

					enqueueSnackbar(error.response?.data.errorMessage, {
					  autoHideDuration: 9000,
					  variant: "error",
					});
				  }
			},
    }
  );
};

export default useCreateProductPrice;
