import { useQuery } from 'react-query';
import { getAccounts, Filter, getAccountsByRoleName, getAccountsByEmail } from '@/services/accounts';

const useAccounts = (filter: Filter) => {
	return useQuery(['Accounts', filter ],
        async () => { 
                if (filter.searchCriteria === "All") {
           return await getAccounts(filter)
                }
           if (filter.searchCriteria === "RoleName") {
                return await getAccountsByRoleName(filter)
             }
           if (filter.searchCriteria === "EMAIL") {
                return await getAccountsByEmail(filter)
             }
        }
	);
};

export default useAccounts;
