import React from "react";
import { Button, Select, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Categoria = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Nombre"
      name="nombre"
      rules={[{ required: true, message: "Ingresa un nombre" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="categoriaAnterior" label="categoria Anterior" rules={[{ required: true }]}>
      <Select placeholder="Seleccion una categoria" allowClear>
        <Option value="male">categoria 1</Option>
        <Option value="female">categoria 2</Option>
        <Option value="other">categoria 3</Option>
      </Select>
    </Form.Item>

    <Form.Item name="categoriaFederal" label="categoria Federal" rules={[{ required: true }]}>
      <Select placeholder="Seleccion una categoria" allowClear>
        <Option value="male">categoria 1</Option>
        <Option value="female">categoria 2</Option>
        <Option value="other">categoria 3</Option>
      </Select>
    </Form.Item>

    <Form.Item name="categoriaEstatal" label="categoria Estatal" rules={[{ required: true }]}>
      <Select placeholder="Seleccion una categoria" allowClear>
        <Option value="male">categoria 1</Option>
        <Option value="female">categoria 2</Option>
        <Option value="other">categoria 3</Option>
      </Select>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default Categoria;
