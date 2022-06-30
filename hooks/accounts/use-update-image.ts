import { updateImageAccount } from '@/services/accounts';
import { UpdateImageAccountDto } from '@/services/accounts/dto/update-accounts-dto';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateImageAccount = () => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateImageAccountDto) => {
            return await updateImageAccount(data);
		},
		{
			onSuccess: (data) => {
				//because data:any
                queryClient.invalidateQueries("GetAccountById")
			},
			
		}
	);
};

export default useUpdateImageAccount;
