import { useQuery } from 'react-query';
import { getColors, Filter } from '@/services/products';

const useColors = (filter: Filter) => {
	return useQuery(['Colors', filter ],
        async () => { 
           return await getColors(filter)
        }
	);
};

export default useColors;
