import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { deleteColor, updateColor } from "@/services/colors";
import {
  deleteColorDto,
  UpdateColorDto,
} from "@/services/colors/dto/update-colors-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useDeleteColor = (handleCloseDialog: () => void) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (id: string) => {
      return await deleteColor(id);
    },
    {
      onSuccess: (data) => {
        handleCloseDialog();
        queryClient.invalidateQueries("Colors");
        enqueueSnackbar("Xóa màu thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This color is in contraints")) {
            tmpError = "Màu này đang tồn tại ở một sản phẩm khác";
            enqueueSnackbar(tmpError, {
              autoHideDuration: 9000,
              variant: "error",
            });
            handleCloseDialog();
          } else {
            handleCloseDialog();
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

export default useDeleteColor;
