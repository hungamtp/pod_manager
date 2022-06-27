import { createSize } from '@/services/sizes';
import { CreateSizeDto } from '@/services/sizes/dto/create-colors-dto';
import { useMutation, useQueryClient } from 'react-query';


const useCreateSize = (handleCloseDialog:() => void) => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateSizeDto) => {
            
            return await createSize(data);
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("Sizes")
			},
			
		}
	);
};

export default useCreateSize;
