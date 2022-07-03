import {  updateProduct } from '@/services/products';
import { UpdateProductDto } from '@/services/products/dto/update-product-dto';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProduct = (handleCloseDialog:() => void) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
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
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
		}
	);
};

export default useUpdateProduct;
