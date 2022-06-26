import { useQuery } from 'react-query';
import { getSizes, Filter } from '@/services/products';

const useSizes = (filter: Filter) => {
	return useQuery(['Sizes', filter ],
        async () => { 
           return await getSizes(filter)
        }
	);
};

export default useSizes;
