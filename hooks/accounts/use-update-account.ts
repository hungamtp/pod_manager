import {  updateAccount } from '@/services/accounts';
import { UpdateAccountDto } from '@/services/accounts/dto/update-accounts-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateAccount = (handleCloseDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateAccountDto) => {
            return await updateAccount(data);
		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("Accounts")
				router.push('/manage-account');
			},
			
		}
	);
};

export default useUpdateAccount;
