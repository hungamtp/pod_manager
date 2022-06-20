import { useQuery } from 'react-query';
import { getProductById, getProducts  } from '@/services/products';

const useGetProductById = (id: number) => {
	return useQuery(['GetProductById'],
        async () => { 
           return await getProductById(id)
        }
	);
};

export default useGetProductById;
