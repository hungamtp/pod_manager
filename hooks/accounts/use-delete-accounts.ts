import {  deleteAccount } from '@/services/accounts';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useDeleteAccount = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (id: number) => {
            return await deleteAccount(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Accounts")
				router.push('/manage-account');
			},
			
		}
	);
};

export default useDeleteAccount;
