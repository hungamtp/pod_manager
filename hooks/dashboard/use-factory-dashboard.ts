import { getFactoryDashboard } from '@/services/dashboard';
import { useQuery } from 'react-query';

const useFactoryDashboard = () => {
	return useQuery(['FactoryDashboard'],
        async () => { 
           return await getFactoryDashboard()
        }
	);
};

export default useFactoryDashboard;
