import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';


const useDeleteProduct = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (id: string) => {
            return await deleteProduct(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Products")
				enqueueSnackbar("Delete successfully!", {
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

export default useDeleteProduct;
