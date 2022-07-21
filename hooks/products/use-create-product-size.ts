import { useMutation, useQueryClient } from "react-query";

import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { addProductSize } from "@/services/products";
import {} from "@/services/products/dto/create-products-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

const useCreateProductSize = (
  setOpenCreateProductSize: (isOpen: boolean) => void
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  let productId = "";
  return useMutation(
    async (data: {
      productId: string;
      size: string;
      width: number;
      height: number;
    }) => {
      productId = data.productId;
      return await addProductSize(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        setOpenCreateProductSize(false);
        queryClient.invalidateQueries(`GetSizeProductByProductId`);
        queryClient.invalidateQueries("GetSizesColorsById");
        enqueueSnackbar("Thêm kích thước thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          enqueueSnackbar(error.response?.data.errorMessage, {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    }
  );
};

export default useCreateProductSize;
