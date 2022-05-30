import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { LoginDto } from "@/services/login/dto/login.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { login } from "@/services/login";

import { useRouter } from "next/router";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (data: LoginDto) => {
      return await login(data);
    },
    {
      onSuccess: (data) => {
        dispatch(loginAction(data));
        console.log(data, "success");
        //because data:any
        router.push('/');
        // router.back();
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
        console.log(error.response?.data.errorMessage, "errorrrrrrrrrrr");
      },
    }
  );
};

export default useLogin;
