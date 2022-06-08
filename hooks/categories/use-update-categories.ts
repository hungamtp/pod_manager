import {  updateCategory } from '@/services/categories';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateCategoryDto } from '@/services/categories/dto/update-categories-dto';


const useUpdateCategory = (handleCloseDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateCategoryDto) => {
            return await updateCategory(data);
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

export default useUpdateCategory;
