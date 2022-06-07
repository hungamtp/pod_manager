import { useQuery } from 'react-query';
import { getProducts, Filter } from '@/services/products';

const useProducts = (filter: Filter) => {
	return useQuery(['Products', filter ],
        async () => { 
           return await getProducts(filter)
        }
	);
};

export default useProducts;
