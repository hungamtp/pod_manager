import { Filter, getAccounts, getAccountsByEmail, getAccountsByName, getAccountsByRoleName } from '@/services/accounts';
import { useQuery } from 'react-query';

const useAccounts = (filter: Filter) => {
	return useQuery(['Accounts', filter ],
        async () => { 
               if (filter.searchCriteria === "All") {
           return await getAccounts(filter)
                }
               if (filter.searchCriteria === "USER" || filter.searchCriteria === "ADMIN") {
                return await getAccountsByRoleName(filter)
             }
                if (filter.searchCriteria === "EMAIL") {
                return await getAccountsByEmail(filter)
             }
                if (filter.searchCriteria === "NAME") {
                return await getAccountsByName(filter)
             }
        }
	);
};

export default useAccounts;
