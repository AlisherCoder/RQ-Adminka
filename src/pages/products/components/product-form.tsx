import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { useGetCategoryes } from '../../catogoryes/service/query/useGetCategoryes';
import useGetColor from '../../colors/query/useGetColor';
import useCreateProduct from '../service/mutation/useCreateProduct';

export type FieldType = {
  name?: string;
  price?: number;
  img?: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  colorIds: string[];
};

interface Item {
  name: string;
  id: string;
  typeId?: string;
}

const ProductForm: React.FC = () => {
  const { data: categories } = useGetCategoryes();
  const { data: colors } = useGetColor();
  const { mutate, isSuccess } = useCreateProduct();

  const categoriesData = categories?.data?.map((item: Item) => ({
    value: item.id,
    label: item.name,
  }));

  const colorsData = colors?.data?.map((item: Item) => ({
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
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input product name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input product description!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input product price!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType>
        label="Count"
        name="count"
        rules={[{ required: true, message: 'Please input product count!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType>
        label="Skidka"
        name="skidka"
        rules={[{ required: true, message: 'Please input product skidka!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<FieldType>
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Please input product category!' }]}
      >
        <Select placeholder="Select category" options={categoriesData} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Color"
        name="colorIds"
        rules={[{ required: true, message: 'Please input product color!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Select colors"
          options={colorsData}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
