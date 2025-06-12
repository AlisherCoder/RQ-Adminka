import {
  Button,
  message,
  Modal,
  Popconfirm,
  Table,
  type TableProps,
} from 'antd';
import { useToggle } from '../../hooks/useToggle';
import { useGetProduct } from './service/query/useGetProduct';
import type { Product } from './types';
import useDeleteProduct from './service/mutation/useDeleteProduct';
import { useEffect } from 'react';
import ProductForm from './components/product-form';

interface dataSource {
  key: string;
  name: string;
  price: number;
  count: number;
  category: string;
  createdAt: string;
  image: string;
}

export const Products = () => {
  const { data } = useGetProduct();
  const { isOpen, open, close } = useToggle();
  // const { isOpen: isOpen2, open: open2, close: close2 } = useToggle();
  const { mutate, isSuccess } = useDeleteProduct();

  const products = data?.map((item: Product) => ({
    name: item.name,
    price: item.price,
    count: item.count,
    category: item.category.name,
    createdAt: item.createdAt.slice(0, 10),
    image: item.img,
    key: item.id,
  }));

  const handleDelete = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('deleted');
    }
  }, [isSuccess]);

  const columns: TableProps<dataSource>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (dataIndexValue, record) => (
        <img width={50} height={50} src={dataIndexValue} alt={record.name} />
      ),
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
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={() => handleDelete(data.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
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
      <Modal className="" footer={false} onCancel={close} open={isOpen}>
        <ProductForm />
      </Modal>
      {/* <Modal footer={false} onCancel={close2} open={isOpen2}></Modal> */}
      <Table<dataSource> dataSource={products} columns={columns} />
    </div>
  );
};
