import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, List } from "antd";
import {
  Agregarrequisitos,
  obtenerTipoRequisitos,
  obtenerRequisitos,
  editarRequisito,
  eliminarRequisito
} from '../services/ServiceCategoria';

const { Option } = Select;

const Requisito = () => {
  const [form] = Form.useForm();
  const [tiposRequisitos, setTiposRequisitos] = useState([]);
  const [requisitos, setRequisitos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      await cargarTiposRequisitos();
      await cargarRequisitos();
    };
    cargarDatos();
  }, []);

  const cargarTiposRequisitos = async () => {
    try {
      const tipos = await obtenerTipoRequisitos();
      setTiposRequisitos(tipos);
    } catch (error) {
      message.error('Error al cargar tipos de requisitos');
    }
  };

  const cargarRequisitos = async () => {
    try {
      const data = await obtenerRequisitos();
      setRequisitos(data);
    } catch (error) {
      message.error("Error al cargar requisitos");
    }
  };

  const onFinish = async (values) => {
    try {
      if (editandoId) {
        await editarRequisito(editandoId, values);
        message.success('Requisito editado exitosamente');
      } else {
        await Agregarrequisitos(values);
        message.success('Requisito agregado exitosamente');
      }
      form.resetFields();
      setEditandoId(null);
      await cargarRequisitos();
    } catch (error) {
      message.error(error.message || 'Error al procesar requisito');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error('Por favor complete todos los campos requeridos');
  };

  const cargarRequisitoAFormulario = (requisito) => {
    form.setFieldsValue({
      descripcion: requisito.descripcion,
      tipo: requisito.tipo.id,
    });
    setEditandoId(requisito.id);
  };

  const eliminarRequisitoHandler = async (id) => {
    try {
      await eliminarRequisito(id);
      message.success("Requisito eliminado correctamente");
      await cargarRequisitos();
    } catch (error) {
      message.error("Error al eliminar requisito");
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="requisitoForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Descripción"
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
            placeholder="Selecciona una opción"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
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
            {editandoId ? "Guardar Cambios" : "Enviar"}
          </Button>
          {editandoId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                setEditandoId(null);
              }}
            >
              Cancelar
            </Button>
          )}
        </Form.Item>
      </Form>

      <List
        header={<h3>Lista de Requisitos</h3>}
        dataSource={requisitos}
        renderItem={(req) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => cargarRequisitoAFormulario(req)}>Editar</Button>,
              <Button danger type="link" onClick={() => eliminarRequisitoHandler(req.id)}>Eliminar</Button>
            ]}
          >
            <List.Item.Meta
              title={req.descripcion}
              description={`Tipo: ${req.tipo?.nombre || 'Desconocido'}`}
            />
          </List.Item>
        )}
        style={{ marginTop: '2rem' }}
      />
    </div>
  );
};

export default Requisito;
