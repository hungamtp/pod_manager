import { useQuery } from 'react-query';
import { Filter, getOrdersFactory } from '@/services/factories';

const useOrdersFactory = (credentialId: string, filter: Filter) => {
	return useQuery(['OrdersFactory', filter ],
        async () => { 
           return await getOrdersFactory(credentialId, filter)
        }
	);
};

export default useOrdersFactory;
