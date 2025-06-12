import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/request';

const useDeleteProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/products/${id}`).then((res) => res.data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export default useDeleteProduct;
