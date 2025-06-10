import { Button, Modal, Table, type TableProps } from 'antd';
import { useToggle } from '../../hooks/useToggle';
import { useGetProduct } from './service/query/useGetProduct';
import type { Product } from './types';

interface dataSource {
  key: string;
  name: string;
  price: number;
  count: number;
  category: string;
  createdAt: string;
}

export const Products = () => {
  const { data } = useGetProduct();
  const { isOpen, open, close } = useToggle();
  const { isOpen: isOpen2, open: open2, close: close2 } = useToggle();

  const products = data?.map((item: Product) => ({
    name: item.name,
    price: item.price,
    count: item.count,
    category: item.category.name,
    createdAt: item.createdAt.slice(0, 10),
    key: item.id,
  }));

  const columns: TableProps<dataSource>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      render: (data: dataSource) => {
        return (
          <div>
            <Button>Delete</Button>
            <Button>Edit</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button onClick={open} type="primary">
        Create
      </Button>
      <Modal footer={false} onCancel={close} open={isOpen}>
        {/* <CategoryForm closeModal={close} /> */}
      </Modal>
      <Modal footer={false} onCancel={close2} open={isOpen2}>
        {/* <CategoryForm defaultValue={initialData} closeModal={close2} /> */}
      </Modal>
      <Table<dataSource> dataSource={products} columns={columns} />
    </div>
  );
};
