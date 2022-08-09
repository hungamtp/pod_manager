import { useMutation, useQueryClient } from "react-query";

import { createSizesColorsForProduct } from "@/services/products";
import {} from "@/services/products/dto/create-products-dto";
import { CreateSizesColorsForProductDto } from "@/services/products/dto/create-size-color-for-product-dto";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

const useCreateSizesColorsForProduct = (
  handleCloseDialog: () => void,
  id: string
) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: CreateSizesColorsForProductDto) => {
      return await createSizesColorsForProduct(data, id);
    },
    {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("GetSizesColorsById");
        queryClient.invalidateQueries("GetProductById");
        queryClient.invalidateQueries("ColorSizeList");
        handleCloseDialog();
        enqueueSnackbar("Tạo mới thành công!", {
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

export default useCreateSizesColorsForProduct;
