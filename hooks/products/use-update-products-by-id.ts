import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { updateProduct } from "@/services/products";
import { UpdateProductDto } from "@/services/products/dto/update-product-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateProductById = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UpdateProductDto) => {
      return await updateProduct(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("Products");
        enqueueSnackbar("Cập nhật sản phẩm thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          //This product name has been existed

          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This product name has been existed")) {
            tmpError = "Tên sản phẩm này đã tồn tại";
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

export default useUpdateProductById;
