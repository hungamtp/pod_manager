import { useAppDispatch } from "@/components/hooks/reduxHook";
import { useMutation, useQueryClient } from "react-query";

import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { createSizeColorProduct } from "@/services/factories";
import { CreateSizeColorProductDto } from "@/services/factories/dto/create-size-color-product-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack';

const useCreateSizeColorProduct = (
  handleCloseDialog: () => void,
  factoryId: string,
  productId: string
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    async (data: CreateSizeColorProductDto[]) => {
      return await createSizeColorProduct(data, factoryId, productId);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("GetFactoryById");
        const message = "Create successfully!";
        enqueueSnackbar(message, {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
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

export default useCreateSizeColorProduct;
