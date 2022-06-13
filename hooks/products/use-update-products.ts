import {  updateProduct } from '@/services/products';
import { UpdateProductDto } from '@/services/products/dto/update-product-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProduct = (handleCloseDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateProductDto) => {
            console.log(data, 'datane');
			return await updateProduct(data);
			
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("Products")
				router.replace('/manage-product');
			},
		}
	);
};

export default useUpdateProduct;
