import { useMutation, useQueryClient } from "react-query";

import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { addProductSize, updateProductSize } from "@/services/products";
import {} from "@/services/products/dto/create-products-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

const useUpdateSizeProduct = (
  setOpenCreateProductSize: (isOpen: boolean) => void,
  productId: string
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: {
      id: string;
      size: string;
      width: number;
      height: number;
    }) => {
      return await updateProductSize(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        setOpenCreateProductSize(false);
        queryClient.invalidateQueries(`GetSizeProductByProductId`);
        queryClient.invalidateQueries("GetSizesColorsById");
        enqueueSnackbar("Cập nhật kích thước thành công!", {
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

export default useUpdateSizeProduct;
