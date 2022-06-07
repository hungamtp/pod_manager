import {  deleteAccount } from '@/services/accounts';
import { DeleteAccountDto } from '@/services/accounts/dto/delete-accounts-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useDeleteAccount = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: DeleteAccountDto) => {
            return await deleteAccount(data);
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
