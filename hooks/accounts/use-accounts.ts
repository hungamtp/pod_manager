import { useQuery } from 'react-query';
import { getAccounts, Filter } from '@/services/accounts';

const useAccounts = (filter: Filter) => {
	return useQuery(['Accounts', filter ],
        async () => { 
           return await getAccounts(filter)
        }
	);
};

export default useAccounts;
