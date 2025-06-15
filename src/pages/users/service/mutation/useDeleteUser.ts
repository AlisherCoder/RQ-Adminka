import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/request';

const useDeleteUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/user/${id}`).then((res) => res.data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export default useDeleteUser;
