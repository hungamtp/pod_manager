import { useQuery } from 'react-query';
import { getColors } from '@/services/products';

const useColors = () => {
	return useQuery(['Colors' ],
        async () => { 
           return await getColors()
        }
	);
};

export default useColors;

