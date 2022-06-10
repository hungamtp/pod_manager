import {  deleteAccount } from '@/services/accounts';
import { deleteCategory } from '@/services/categories';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useDeleteCategory = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (id: number) => {
            return await deleteCategory(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Categories")
				router.push('/manage-category');
			},
			
		}
	);
};

export default useDeleteCategory;
