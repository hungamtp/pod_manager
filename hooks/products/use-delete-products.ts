import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';


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
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useDeleteProduct;
