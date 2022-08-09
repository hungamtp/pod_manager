import { deleteAccount } from "@/services/accounts";
import { deleteCategory } from "@/services/categories";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

const useDeleteCategory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (id: string) => {
      return await deleteCategory(id);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("Categories");
        enqueueSnackbar("Xóa thể loại thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("is existed in some products")) {
            tmpError = "Thể loại này đang tồn tại ở sản phẩm khác";
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

export default useDeleteCategory;
