import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { createColor } from '@/services/colors';
import { CreateColorDto } from '@/services/colors/dto/create-colors-dto';

const useCreateColor = (handleCloseDialog:() => void) => {
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: CreateColorDto) => {
            
            return await createColor(data);
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("Colors")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useCreateColor;
