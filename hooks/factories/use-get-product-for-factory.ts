import { getProductForFactory } from '@/services/factories';
import { useQuery, useQueryClient } from 'react-query';

const useGetProductForFactory = (id: string) => {
  const queryClient = useQueryClient();

	return useQuery(['GetProductForFactory'],
        async () => { 
                   return await getProductForFactory(id)
        },
       
	);
};

export default useGetProductForFactory;
