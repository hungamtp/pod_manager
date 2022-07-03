import {  deleteAccount } from '@/services/accounts';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';


const useDeleteAccount = () => {
	const router = useRouter();
    const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	return useMutation(
		      
        async (id: string) => {
            return await deleteAccount(id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("Accounts")
				enqueueSnackbar("Delete successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useDeleteAccount;
