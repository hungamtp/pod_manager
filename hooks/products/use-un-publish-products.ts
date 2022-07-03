import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { unPublishProduct } from '@/services/products';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';


const useUnPublishProduct = (handleClosePublishDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation(
		      
        async (id: string) => {
            return await unPublishProduct(id);
		},
		{
			onSettled: (data) => {
				handleClosePublishDialog()
                queryClient.invalidateQueries("Products")
				enqueueSnackbar("Create successfully!", {
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

export default useUnPublishProduct;
