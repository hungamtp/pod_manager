import {  updateProduct } from '@/services/products';
import { UpdateProductDto } from '@/services/products/dto/update-product-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProductById = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateProductDto) => {
			return await updateProduct(data);
		},
		{
			onSuccess: (data) => {
				//because data:any
                queryClient.invalidateQueries("Products")
			},
		}
	);
};

export default useUpdateProductById;
