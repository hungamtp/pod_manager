import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { useSnackbar } from "notistack";

import { useRouter } from "next/router";
import { CreateAccountDto } from "@/services/accounts/dto/create-accounts-dto";
import { createAccountAdmin, createAccountUser } from "@/services/accounts";

const useCreateAccount = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    async (data: CreateAccountDto) => {
      if (data.roleName == "USER") {
        return await createAccountUser(data);
      }

      return await createAccountAdmin(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        handleCloseDialog();

        queryClient.invalidateQueries("Accounts");
        enqueueSnackbar("Tạo tài khoản thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          //This email is already existed

          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("This email is already existed")) {
            tmpError = "Địa chỉ email này đã tồn tại";
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

export default useCreateAccount;
