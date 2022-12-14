import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { LoginDto } from "@/services/login/dto/login.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { login } from "@/services/login";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (auth.roleName === "ADMIN") {
      router.push("/");
    } else if (auth.roleName === "FACTORY") router.push("/factory/dash-board");
    // router.back();
    else router.push("/login");
  }, [auth]);
  return useMutation(
    async (data: LoginDto) => {
      return await login(data);
    },
    {
      onSuccess: async (data) => {
        await dispatch(loginAction(data));
        if (auth.roleName === "ADMIN") {
          router.push("/");
        } else if (auth.roleName === "FACTORY")
          router.push("/factory/dash-board");
        // router.back();
        else router.push("/login");
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        if (error) {
          let tmpError = error.response?.data.errorMessage;
          if (tmpError?.includes("Email or password is incorrect")) {
            tmpError = "Tài khoản hoặc mật khẩu không đúng";
            enqueueSnackbar(tmpError, {
              autoHideDuration: 9000,
              variant: "error",
            });
          } else if (
            tmpError?.includes("This factory is not available at this time")
          ) {
            tmpError = "Tài khoản của bạn đã bị khóa";
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

export default useLogin;
