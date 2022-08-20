import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import ManageProduct from "@/pages/manage-product";
import { publishProduct } from "@/services/products";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const usePublishProduct = (handleClosePublishDialog: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (id: string) => {
      return await publishProduct(id);
    },
    {
      onSuccess: (data) => {
        handleClosePublishDialog();
        queryClient.invalidateQueries("Products");
        enqueueSnackbar("Công bố sản phẩm thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          //This product don't have price by factory
          //Product does not have enough blueprint
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This product don't have price by factory")) {
            tmpError = "Sản phẩm chưa có nhà in sản xuất";
            enqueueSnackbar(tmpError, {
              autoHideDuration: 9000,
              variant: "error",
            });
            handleClosePublishDialog();
          } else if (
            tmpError?.includes("Product does not have enough blueprint")
          ) {
            tmpError = "Sản phẩm không đủ bản thiết kế để công bố";
            enqueueSnackbar(tmpError, {
              autoHideDuration: 9000,
              variant: "error",
            });
            handleClosePublishDialog();
          } else {
            enqueueSnackbar(error.response?.data.errorMessage, {
              autoHideDuration: 9000,
              variant: "error",
            });
            handleClosePublishDialog();
          }
        }
      },
    }
  );
};

export default usePublishProduct;
