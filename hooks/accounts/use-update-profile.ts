import {  updateAccount } from '@/services/accounts';
import { UpdateAccountDto } from '@/services/accounts/dto/update-accounts-dto';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';


const useUpdateProfile = () => {
    const queryClient = useQueryClient();
	const { enqueueSnackbar} = useSnackbar();
	return useMutation(
		      
        async (data: UpdateAccountDto) => {
            return await updateAccount(data);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
				enqueueSnackbar("Update successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useUpdateProfile;
