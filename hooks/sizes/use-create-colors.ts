import { createSize } from '@/services/sizes';
import { CreateSizeDto } from '@/services/sizes/dto/create-colors-dto';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';


const useCreateSize = (handleCloseDialog:() => void) => {
	const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateSizeDto) => {
            
            return await createSize(data);
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("Sizes")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useCreateSize;
