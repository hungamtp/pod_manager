import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { createMaterial } from "@/services/material";
import { CreateMaterialDto } from "@/services/material/dto/create-material-dto";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useCreateMaterial = (handleCloseDialog: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: CreateMaterialDto) => {
      return await createMaterial(data);
    },
    {
      onSuccess: (data) => {
        handleCloseDialog();
        queryClient.invalidateQueries("Material");
        enqueueSnackbar("Tạo chất liệu thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("already existed")) {
            tmpError = "Chất liệu này đã tồn tại";
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

export default useCreateMaterial;
