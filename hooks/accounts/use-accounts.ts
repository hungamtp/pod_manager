import { useQuery } from 'react-query';
import { getAccounts, Filter, getAccountsByRoleName } from '@/services/accounts';

const useAccounts = (filter: Filter) => {
	return useQuery(['Accounts', filter ],
        async () => { 
                if (filter.searchCriteria === "All") {
           return await getAccounts(filter)
                }
           if (filter.searchCriteria === "RoleName") {
                return await getAccountsByRoleName(filter)
             }
        }
	);
};

export default useAccounts;
