import { useQuery } from '@tanstack/react-query';
import { request } from '../../../../config/request';

const useGetRegion = () => {
  return useQuery({
    queryKey: ['region'],
    queryFn: () => request.get('/region').then((res) => res.data),
  });
};

export default useGetRegion;
