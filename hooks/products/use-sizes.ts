import { useQuery } from 'react-query';
import { getSizes } from '@/services/products';

const useSizes = () => {
	return useQuery(['Sizes'],
        async () => { 
           return await getSizes()
        }
	);
};

export default useSizes;

