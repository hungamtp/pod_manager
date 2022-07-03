import { useQuery } from 'react-query';
import { getProductBlueprint  } from '@/services/products';

const useGetProductBlueprint = (id: string) => {
	return useQuery(['GetProductBlueprint'],
        async () => { 
           return await getProductBlueprint(id)
        }
	);
};

export default useGetProductBlueprint;
