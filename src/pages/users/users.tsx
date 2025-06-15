import {
  Button,
  message,
  Modal,
  Popconfirm,
  Table,
  type TableProps,
} from 'antd';
import { useEffect } from 'react';
import { useToggle } from '../../hooks/useToggle';
import useGetUser from './service/query/useGetUser';
import type { User } from './types';
import useDeleteUser from './service/mutation/useDeleteUser';
import UserForm from './components/user-form';

interface dataSource {
  key: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  image: string;
}

export const Users = () => {
  const { data } = useGetUser();
  const { mutate, isSuccess } = useDeleteUser();
  const { isOpen, open, close } = useToggle();
  // const { isOpen: isOpen2, open: open2, close: close2 } = useToggle();

  const users = data?.users?.map((item: User) => ({
    firstname: item.firstname,
    lastname: item.lastname,
    createdAt: item.createdAt,
    image: item.img,
    email: item.email,
    key: item.id,
  }));

  const handleDelete = (id: string) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Deleted successfully');
    }
  }, [isSuccess]);

  const columns: TableProps<dataSource>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (dataIndexValue) => (
        <img width={50} height={50} src={dataIndexValue} alt={'User image'} />
      ),
    },
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
    },

    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
        <UserForm />
      </Modal>
      {/* <Modal footer={false} onCancel={close2} open={isOpen2}></Modal> */}
      <Table<dataSource> columns={columns} dataSource={users} />
    </div>
  );
};
