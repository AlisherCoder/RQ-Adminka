import { useQuery } from '@tanstack/react-query';
import { request } from '../../../config/request';

const useGetColor = () => {
  return useQuery({
    queryKey: ['colors'],
    queryFn: () => request.get('/color').then((res) => res.data),
  });
};

export default useGetColor;
