import { unPublishProduct } from '@/services/products';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUnPublishProduct = (handleClosePublishDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (id: number) => {
            return await unPublishProduct(id);
		},
		{
			onSettled: (data) => {
				handleClosePublishDialog()
                queryClient.invalidateQueries("Products")
			},
			
		}
	);
};

export default useUnPublishProduct;
