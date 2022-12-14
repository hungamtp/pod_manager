import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

import { useRouter } from "next/router";
import { createCategory } from "@/services/categories";
import { CreateCategoryDto } from "@/services/categories/dto/create-categories-dto";
import { CreateProductDto } from "@/services/products/dto/create-products-dto";
import { createProduct } from "@/services/products";
import { useSnackbar } from "notistack";

const useCreateProduct = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreateProductDto) => {
      return await createProduct(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("Products");
        enqueueSnackbar("Tạo sản phẩm thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          //This product name has been existed
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This product name has been existed")) {
            tmpError = "Sản phẩm này đã tồn tại";
            enqueueSnackbar(tmpError, {
              autoHideDuration: 9000,
              variant: "error",
            });
          } else {
            enqueueSnackbar(error.response?.data.errorMessage, {
              autoHideDuration: 9000,
              variant: "error",
            });
          }
        }
      },
    }
  );
};

export default useCreateProduct;
