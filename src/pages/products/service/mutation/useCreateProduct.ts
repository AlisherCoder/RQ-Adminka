import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../../../config/request';
import type { FieldType } from '../../components/product-form';

const useCreateProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: FieldType) =>
      request.post('/products', data).then((res) => res.data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export default useCreateProduct;
