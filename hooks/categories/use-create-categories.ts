import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { createCategory } from "@/services/categories";
import { CreateCategoryDto } from "@/services/categories/dto/create-categories-dto";

const useCreateCategory = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: CreateCategoryDto) => {
      return await createCategory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("Categories");
        enqueueSnackbar("Tạo mới thể loại thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          //This category has been existed
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

export default useCreateCategory;
