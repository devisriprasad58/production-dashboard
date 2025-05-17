import { useQuery } from '@tanstack/react-query';
import data from '../data/data.json';

const fetchProductionData = async (): Promise<any[]> => {
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  return data;
};

export const useFetchData = () => {
  return useQuery({
    queryKey: ['productionData'],
    queryFn: fetchProductionData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
