import { deleteAccount } from "@/services/accounts";
import { deleteCategory } from "@/services/categories";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { DeleteAccountFactory } from "@/services/factories";

const useDeleteFactory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  let collab = "";
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: { id: string; isCollaborating: string }) => {
      collab = data.isCollaborating;
      return await DeleteAccountFactory(data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("Factories");
        let message = "";
        if (collab === "false") {
          message = "Ngừng hợp tác với nhà in thành công";
        } else {
          message = "Hợp tác với nhà in thành công";
        }
        enqueueSnackbar(message, {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("Factory is having order in delivery")) {
            tmpError = "Nhà in này còn đơn hàng đang sản xuất";
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

export default useDeleteFactory;
