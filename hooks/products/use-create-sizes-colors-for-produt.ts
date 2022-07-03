import { useMutation, useQueryClient } from 'react-query';

import { createSizesColorsForProduct } from '@/services/products';
import { } from '@/services/products/dto/create-products-dto';
import { CreateSizesColorsForProductDto } from '@/services/products/dto/create-size-color-for-product-dto';
import { useSnackbar } from 'notistack';

const useCreateSizesColorsForProduct = (handleCloseDialog:() => void, id: string) => {
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: CreateSizesColorsForProductDto) => {
            
            return await createSizesColorsForProduct(data, id);
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("GetSizesColorsById")
                queryClient.invalidateQueries("GetProductById")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useCreateSizesColorsForProduct;
