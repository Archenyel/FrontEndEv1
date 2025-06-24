import { useState } from 'react';
import { Button, Form, Input, Select, message } from "antd";
import { Agregarrequisitos, obtenerTipoRequisitos } from '../services/ServiceCategoria'; 

const { Option } = Select;

const Requisito = () => {
  const [form] = Form.useForm();
  const [tiposRequisitos, setTiposRequisitos] = useState([]);


  useState(() => {
    const cargarTiposRequisitos = async () => {
      try {
        const tipos = await obtenerTipoRequisitos();
        setTiposRequisitos(tipos);
      } catch (error) {
        message.error('Error al cargar tipos de requisitos');
      }
    };
    cargarTiposRequisitos();
  }, []);

  const onFinish = async (values) => {
    try {
      await Agregarrequisitos(values);
      message.success('Requisito agregado exitosamente');
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Error al agregar requisito');
    } finally {
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error('Por favor complete todos los campos requeridos');
  };

  return (
    <div>
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
          label="Descripcion"
          name="descripcion"
          rules={[{ required: true, message: "Por favor ingrese la descripción!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          label="Tipo" 
          name="tipo"
          rules={[{ required: true, message: "Por favor seleccione un tipo!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selecciona una opción"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tiposRequisitos.map(tipo => (
              <Option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Requisito;