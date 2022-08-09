import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { createSize, updateSize } from "@/services/sizes";
import { CreateSizeDto } from "@/services/sizes/dto/create-sizes-dto";
import { UpdateSizeDto } from "@/services/sizes/dto/update-sizes-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateSize = (handleCloseDialog: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UpdateSizeDto) => {
      return await updateSize(data);
    },
    {
      onSuccess: (data) => {
        handleCloseDialog();
        queryClient.invalidateQueries("Sizes");
        enqueueSnackbar("Chỉnh sửa kích thước thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          // This size is already existed
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This size is already existed")) {
            tmpError = "Kích thước này đã tồn tại";
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

export default useUpdateSize;
