import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { LoginDto } from "@/services/login/dto/login.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { login } from "@/services/login";

import { useRouter } from "next/router";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  return useMutation(
    async (data: LoginDto) => {
      return await login(data);
    },
    {
      onSuccess: (data) => {
        dispatch(loginAction(data));
        console.log(data, "success");
        if (auth.roleName === "ADMIN")
          //because data:any
          router.push("/");
        else if (auth.roleName === "FACTORY") router.push("/factory");
        // router.back();
        else router.push("/login");
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        console.log(error.response?.data.errorMessage, "errorrrrrrrrrrr");
      },
    }
  );
};

export default useLogin;
