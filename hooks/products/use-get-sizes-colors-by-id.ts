import { useQuery } from 'react-query';
import {  getSizesAndColorsById  } from '@/services/products';

const useGetSizesColorsById = (id: number) => {
	return useQuery(['GetSizesColorsById'],
        async () => { 
           return await getSizesAndColorsById(id)
        }
	);
};

export default useGetSizesColorsById;
