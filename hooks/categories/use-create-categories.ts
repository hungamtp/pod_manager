import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/components/hooks/reduxHook';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';

import { useRouter } from 'next/router';
import { createCategory } from '@/services/categories';
import { CreateCategoryDto } from '@/services/categories/dto/create-categories-dto';

const useCreateCategory = (handleCloseDialog:() => void) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateCategoryDto) => {
            
            return await createCategory(data);
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("Categories")
				router.push('/manage-category');
			},
			
		}
	);
};

export default useCreateCategory;
