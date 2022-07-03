import { useQuery } from 'react-query';
import {  getSizesAndColorsById  } from '@/services/products';

const useGetSizesColorsById = (id: string) => {
        return useQuery(['GetSizesColorsById', id],
        
        async () => { 
           return await getSizesAndColorsById(id)
        }
	);
};

export default useGetSizesColorsById;
