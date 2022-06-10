import { deleteProduct } from '@/services/products';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useDeleteProduct = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (id: number) => {
            return await deleteProduct(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Products")
				router.push('/manage-product');
			},
			
		}
	);
};

export default useDeleteProduct;
