import { useQuery } from 'react-query';
import { getAccountById } from '@/services/accounts';

const useGetAccountById = (id: string) => {
	return useQuery(['GetAccountById'],
        async () => { 
           return await getAccountById(id)
        }
	);
};

export default useGetAccountById;
