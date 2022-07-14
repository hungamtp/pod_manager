import { useQuery } from 'react-query';
import { getColors, Filter } from '@/services/products';
import { useAppSelector } from '@/components/hooks/reduxHook';

const useColors = (filter: Filter) => {
        const auth = useAppSelector(state=>state.auth);
        
	return useQuery(['Colors', filter ],
        async () => { 
           return await getColors(filter)
        },{enabled:auth.roleName==='ADMIN' }
	);
};

export default useColors;
