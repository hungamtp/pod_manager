import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/components/hooks/reduxHook';
import { ErrorHttpResponse } from '@/models/error_http_response.interface';

import { useRouter } from 'next/router';
import { CreateAccountDto } from '@/services/accounts/dto/create-accounts-dto';
import { createAccountAdmin, createAccountFactory, createAccountUser } from '@/services/accounts';

const useCreateAccount = (handleCloseDialog:() => void) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateAccountDto) => {
            if (data.roleName == "USER") {
			return await createAccountUser(data);
                
            }
            if(data.roleName == "FACTORY"){
                return await createAccountFactory(data);

            }
            return await createAccountAdmin(data);
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

export default useCreateAccount;
