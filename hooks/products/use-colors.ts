import { useQuery } from 'react-query';
import { getColors } from '@/services/products';
import { useAppSelector } from '@/components/hooks/reduxHook';

const useColors = () => {
        const auth = useAppSelector(state=>state.auth)
	return useQuery(['Colors' ],
        async () => { 
           return await getColors()
        },{enabled:auth.roleName==='ADMIN' }
	);
};

export default useColors;

