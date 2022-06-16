import { useQuery } from 'react-query';
import { getFactories, Filter } from '@/services/factories';

const useFactories = (filter: Filter) => {
	return useQuery(['Factories', filter ],
        async () => { 
           return await getFactories(filter)
        }
	);
};

export default useFactories;
