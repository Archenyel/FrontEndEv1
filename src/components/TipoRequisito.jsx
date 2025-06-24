import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import {
  AgregarTipoRequisito,
  obtenerTipoRequisitos,
  editarTipoRequisito,
  eliminarTipoRequisito,
} from "../services/ServiceCategoria";

const { Option } = Select;

const TipoRequisito = () => {
  const [form] = Form.useForm();
  const [tipos, setTipos] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [editando, setEditando] = useState(false);

  const cargarTipos = async () => {
    try {
      const data = await obtenerTipoRequisitos();
      setTipos(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error("Error al cargar tipos de requisito");
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const onFinish = async (values) => {
    try {
      if (editando && idSeleccionado) {
        await editarTipoRequisito(idSeleccionado, values);
        message.success("Tipo de requisito editado exitosamente");
      } else {
        await AgregarTipoRequisito(values);
        message.success("Tipo de requisito agregado exitosamente");
      }
      resetFormulario();
      cargarTipos();
    } catch (error) {
      message.error(error.message || "Error al guardar tipo de requisito");
    }
  };

  const handleSeleccion = (id) => {
    const tipo = tipos.find((t) => t.id === id);
    if (tipo) {
      form.setFieldsValue({ nombre: tipo.nombre });
      setIdSeleccionado(id);
      setEditando(true);
    }
  };

  const handleEliminar = async () => {
    if (!idSeleccionado) {
      return message.warning("Selecciona un tipo de requisito para eliminar");
    }

    try {
      await eliminarTipoRequisito(idSeleccionado);
      message.success("Tipo de requisito eliminado");
      resetFormulario();
      cargarTipos();
    } catch (error) {
      message.error("Error al eliminar tipo de requisito");
    }
  };

  const resetFormulario = () => {
    form.resetFields();
    setIdSeleccionado(null);
    setEditando(false);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre Requisito"
          name="nombre"
          rules={[{ required: true, message: "Ingresa un nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {editando ? "Editar" : "Agregar"}
          </Button>

          {editando && (
            <>
              <Button
                style={{ marginLeft: 10 }}
                onClick={resetFormulario}
              >
                Cancelar
              </Button>
              <Button
                danger
                style={{ marginLeft: 10 }}
                onClick={handleEliminar}
              >
                Eliminar
              </Button>
            </>
          )}
        </Form.Item>
      </Form>

      <div style={{ maxWidth: 600, marginTop: 20 }}>
        <h4>Seleccionar tipo para editar o eliminar:</h4>
        <Select
          style={{ width: "100%" }}
          placeholder="Selecciona un tipo"
          onChange={handleSeleccion}
          value={idSeleccionado}
          allowClear
        >
          {tipos.map((tipo) => (
            <Option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};
export default TipoRequisito;