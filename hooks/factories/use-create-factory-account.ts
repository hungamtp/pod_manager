import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

import { createAccountFactory } from '@/services/factories';
import { CreateFactoryDto } from '@/services/factories/dto/create-factory-dto';
import { useRouter } from 'next/router';

const useCreateFactoryAccount = (handleCloseDialog:() => void) => {
	const router = useRouter();
    const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	return useMutation(
		      
        async (data: CreateFactoryDto) => {
           
                return await createAccountFactory(data);

		},
		{
			onSuccess: (data) => {
				//because data:any
                handleCloseDialog()
                queryClient.invalidateQueries("Factories")
				enqueueSnackbar("Create successfully!", {
					autoHideDuration: 3000,
					variant: "success",
				  });
			},
			
		}
	);
};

export default useCreateFactoryAccount;
