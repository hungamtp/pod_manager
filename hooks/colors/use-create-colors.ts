import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { createColor } from '@/services/colors';
import { CreateColorDto } from '@/services/colors/dto/create-colors-dto';
import { AxiosError } from 'axios';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';

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
			},onError: (error: AxiosError<ErrorHttpResponse>) => {
				if (error) {
					handleCloseDialog()
					enqueueSnackbar(error.response?.data.errorMessage, {
					  autoHideDuration: 9000,
					  variant: "error",
					});
				  }
			},
			
		}
	);
};

export default useCreateColor;
