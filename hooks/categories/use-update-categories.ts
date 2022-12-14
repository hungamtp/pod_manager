import { updateCategory } from "@/services/categories";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { UpdateCategoryDto } from "@/services/categories/dto/update-categories-dto";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

const useUpdateCategory = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: UpdateCategoryDto) => {
      return await updateCategory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("Categories");
        enqueueSnackbar("Cập nhật thể loại thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This category has been existed")) {
            tmpError = "Thể loại này đã tồn tại";
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

export default useUpdateCategory;
