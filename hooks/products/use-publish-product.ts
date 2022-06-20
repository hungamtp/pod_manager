import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import ManageProduct from '@/pages/manage-product';
import { publishProduct } from '@/services/products';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const usePublishProduct = (handleClosePublishDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (id: number) => {
            return await publishProduct(id);
		},
		{
			onSettled: (data) => {
				handleClosePublishDialog()
                queryClient.invalidateQueries("Products")
			},
			onError: (error: AxiosError<ErrorHttpResponse>) => {
				console.log(error.response?.data.errorMessage, "errorrrrrrrrrrr");
			},
			
		}
	);
};

export default usePublishProduct;
