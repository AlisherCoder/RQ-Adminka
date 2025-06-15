import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/request';
import type { FieldType } from '../../components/user-form';

const useCreateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: FieldType) =>
      request.post('/user', data).then((res) => res.data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export default useCreateUser;
