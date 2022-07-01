import { useMutation, useQueryClient } from 'react-query';

import { createSizesColorsForProduct } from '@/services/products';
import { } from '@/services/products/dto/create-products-dto';
import { CreateSizesColorsForProductDto } from '@/services/products/dto/create-size-color-for-product-dto';

const useCreateSizesColorsForProduct = (handleCloseDialog:() => void, id: number) => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateSizesColorsForProductDto) => {
            
            return await createSizesColorsForProduct(data, id);
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("GetSizesColorsById")
			},
			
		}
	);
};

export default useCreateSizesColorsForProduct;
