import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { updateProductBlueprint } from '@/services/products';
import { UpdateProductBlueprintDto } from '@/services/products/dto/update-product-blueprint-dto';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProductBlueprint = (handleCloseDialog:() => void) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateProductBlueprintDto) => {
			return await updateProductBlueprint(data);
			
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("GetProductById")
                queryClient.invalidateQueries("GetProductBlueprint")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},onError: (error: AxiosError<ErrorHttpResponse>) => {
				if (error) {
					enqueueSnackbar(error.response?.data.errorMessage, {
					  autoHideDuration: 9000,
					  variant: "error",
					});
				  }
			},
		}
	);
};

export default useUpdateProductBlueprint;
