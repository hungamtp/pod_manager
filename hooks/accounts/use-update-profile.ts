import {  updateAccount } from '@/services/accounts';
import { UpdateAccountDto } from '@/services/accounts/dto/update-accounts-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProfile = () => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateAccountDto) => {
            return await updateAccount(data);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
			},
			
		}
	);
};

export default useUpdateProfile;
