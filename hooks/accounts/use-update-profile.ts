import {  updateAccount } from '@/services/accounts';
import { UpdateAccountDto } from '@/services/accounts/dto/update-accounts-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';


const useUpdateProfile = () => {
    const queryClient = useQueryClient();
	const { enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: UpdateAccountDto) => {
            return await updateAccount(data);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
				enqueueSnackbar("Chỉnh sửa thông tin thành công!", {
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

export default useUpdateProfile;
