import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { AgregarTipoRequisito } from '../services/ServiceCategoria';

const TipoRequisito = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await AgregarTipoRequisito(values);
      message.success('Tipo de requisito agregado exitosamente');
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Error al agregar tipo de requisito');
    } finally {

    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Por favor complete el campo requerido');
  };

  return (
    <Form
      form={form}
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
        label="Nombre Requisito"
        name="nombre"
        rules={[{ required: true, message: 'Ingresa un nombre para el tipo de requisito' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TipoRequisito;