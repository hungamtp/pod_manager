import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { createSize, deleteSize, updateSize } from "@/services/sizes";
import { CreateSizeDto } from "@/services/sizes/dto/create-sizes-dto";
import {
  deleteSizeDto,
  UpdateSizeDto,
} from "@/services/sizes/dto/update-sizes-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useDeleteSize = (handleCloseDialog: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: deleteSizeDto) => {
      return await deleteSize(data);
    },
    {
      onSuccess: (data) => {
        handleCloseDialog();
        queryClient.invalidateQueries("Sizes");
        enqueueSnackbar("Xóa kích thước thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          // This size is in contraints

          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This size is in contraints")) {
            tmpError = "Kích thước này đã tồn tại";
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
          handleCloseDialog();
        }
      },
    }
  );
};

export default useDeleteSize;
