import { useQuery } from '@tanstack/react-query';
import { request } from '../../../../config/request';

const useGetUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => request.get('/user').then((res) => res.data),
  });
};

export default useGetUser;
