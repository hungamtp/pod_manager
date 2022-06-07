import { useQuery } from 'react-query';
import { getCategories, Filter } from '@/services/categories';

const useCategories = (filter: Filter) => {
	return useQuery(['Categories', filter ],
        async () => { 
           return await getCategories(filter)
        }
	);
};

export default useCategories;
