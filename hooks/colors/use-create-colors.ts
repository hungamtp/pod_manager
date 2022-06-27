import { useMutation, useQueryClient } from 'react-query';

import { createColor } from '@/services/colors';
import { CreateColorDto } from '@/services/colors/dto/create-colors-dto';

const useCreateColor = (handleCloseDialog:() => void) => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: CreateColorDto) => {
            
            return await createColor(data);
		},
		{
			onSuccess: (data) => {
                handleCloseDialog()
                queryClient.invalidateQueries("Colors")
			},
			
		}
	);
};

export default useCreateColor;
