import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { updateFactory } from "@/services/factories";
import { UpdateFactoryDto } from "@/services/factories/dto/update-factory-dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateFactory = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UpdateFactoryDto) => {
      return await updateFactory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("GetFactoryById");
        enqueueSnackbar("Cập nhật nhà in thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          enqueueSnackbar(error.response?.data.errorMessage, {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    }
  );
};

export default useUpdateFactory;
