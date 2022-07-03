import { getFactoryById } from '@/services/factories';
import { useQuery } from 'react-query';

const useGetFactoryById = (id: string) => {
	return useQuery(['GetFactoryById'],
        async () => { 
                   return await getFactoryById(id)
        }
	);
};

export default useGetFactoryById;
