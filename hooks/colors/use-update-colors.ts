import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { updateColor } from '@/services/colors';
import { UpdateColorDto } from '@/services/colors/dto/update-colors-dto';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateColor = (handleCloseDialog:() => void) => {
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: UpdateColorDto) => {
            
            return await updateColor(data);
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("Colors")
				enqueueSnackbar("Update successfully!", {
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

export default useUpdateColor;
