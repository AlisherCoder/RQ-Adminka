import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message, Select } from 'antd';
import useCreateUser from '../service/mutation/useCreateUser';
import useGetRegion from '../../region/service/query/useGetRegion';

export type FieldType = {
  firstname: string;
  lastname: string;
  img: string;
  email: string;
  password: string;
  regionId: string;
};

interface Item {
  name: string;
  id: string;
  typeId?: string;
}

const UserForm: React.FC = () => {
  const { data } = useGetRegion();
  const { mutate, isSuccess } = useCreateUser();

  const regionsData = data?.data?.map((item: Item) => ({
    value: item.id,
    label: item.name,
  }));

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    values.img = 'https://keldibekov.online/uploads/1749747080471.jpg';
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Created');
    }
  }, [isSuccess]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="First name"
        name="firstname"
        rules={[{ required: true, message: 'Please input product firstname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Last name"
        name="lastname"
        rules={[{ required: true, message: 'Please input product lastname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input product email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input product password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Region"
        name="regionId"
        rules={[{ required: true, message: 'Please input product region!' }]}
      >
        <Select placeholder="Select region" options={regionsData} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
