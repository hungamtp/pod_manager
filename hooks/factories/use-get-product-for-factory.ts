import { getProductForFactory } from '@/services/factories';
import { useQuery } from 'react-query';

const useGetProductForFactory = (id: number) => {
	return useQuery(['GetProductForFactory'],
        async () => { 
                   return await getProductForFactory(id)
        }
	);
};

export default useGetProductForFactory;
