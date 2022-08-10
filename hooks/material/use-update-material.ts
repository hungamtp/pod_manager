import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { updateMaterial } from "@/services/material";
import { UpdateMaterialDto } from "@/services/material/dto/update-material-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateMaterial = (handleCloseDialog: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UpdateMaterialDto) => {
      return await updateMaterial(data);
    },
    {
      onSuccess: (data) => {
        handleCloseDialog();
        queryClient.invalidateQueries("Material");
        enqueueSnackbar("Cập nhật chất liệu thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          // This size is already existed
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("already existed")) {
            tmpError = "Chất liệu này đã tồn tại";
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

export default useUpdateMaterial;
