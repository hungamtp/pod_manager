import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

import { createAccountFactory } from "@/services/factories";
import { CreateFactoryDto } from "@/services/factories/dto/create-factory-dto";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

const useCreateFactoryAccount = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    async (data: CreateFactoryDto) => {
      return await createAccountFactory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();
        queryClient.invalidateQueries("Factories");
        enqueueSnackbar("Tạo mới thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          handleCloseDialog();
          enqueueSnackbar(error.response?.data.errorMessage, {
            autoHideDuration: 9000,
            variant: "error",
          });
        }
      },
    }
  );
};

export default useCreateFactoryAccount;
