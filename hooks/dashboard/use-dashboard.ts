import { getDashboard } from '@/services/dashboard';
import { useQuery } from 'react-query';

const useAdminDashboard = () => {
	return useQuery(['AdminDashboard'],
        async () => { 
           return await getDashboard()
        }
	);
};

export default useAdminDashboard;
