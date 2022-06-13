import { publishProduct } from '@/services/products';
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
			
		}
	);
};

export default usePublishProduct;
