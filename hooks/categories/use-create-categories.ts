import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/components/hooks/reduxHook';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { createCategory } from '@/services/categories';
import { CreateCategoryDto } from '@/services/categories/dto/create-categories-dto';

const useCreateCategory = (handleCloseDialog:() => void) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: CreateCategoryDto) => {
            
            return await createCategory(data);
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("Categories")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useCreateCategory;
