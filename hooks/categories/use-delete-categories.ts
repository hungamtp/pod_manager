import {  deleteAccount } from '@/services/accounts';
import { deleteCategory } from '@/services/categories';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';


const useDeleteCategory = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (id: string) => {
            return await deleteCategory(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Categories")
				enqueueSnackbar("Delete successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},onError: (error: AxiosError<ErrorHttpResponse>) => {
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

export default useDeleteCategory;
