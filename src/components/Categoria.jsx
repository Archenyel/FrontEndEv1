import React, { useState, useEffect } from "react";
import { Button, Select, Form, Input, message } from "antd";
import {
  Agregarcategoria,
  editarCategoria,
  eliminarCategoria,
  obtenerCategorias,
} from "../services/ServiceCategoria";

const { Option } = Select;

const Categoria = () => {
  const [form] = Form.useForm();
  const [editando, setEditando] = useState(false);
  const [idCategoria, setIdCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const data = await obtenerCategorias();
    setCategorias(data);
    console.log(data);
  };

  const onSelectCategoria = (id) => {
    const categoria = categorias.find((c) => c.id === id);
    if (categoria) {
      form.setFieldsValue({
        nombre: categoria.nombre,
        categoria_anterior: categoria.categoria_anterior,
        categoria_federal: categoria.categoria_federal,
        categoria_estatal: categoria.categoria_estatal,
      });
      setEditando(true);
      setIdCategoria(id);
    }
  };

  const onFinish = async (values) => {
    try {
      if (editando && idCategoria) {
        await editarCategoria(idCategoria, values);
        message.success("Categoría editada exitosamente");
      } else {
        await Agregarcategoria(values);
        message.success("Categoría agregada exitosamente");
      }
      resetFormulario();
      await cargarCategorias();
    } catch (error) {
      message.error(error);
    }
  };

  const handleEliminar = async () => {
    if (!idCategoria) {
      return message.warning("Selecciona una categoría a eliminar");
    }
    try {
      await eliminarCategoria(idCategoria);
      message.success("Categoría eliminada exitosamente");
      resetFormulario();
      await cargarCategorias();
    } catch (error) {
      message.error(error);
    }
  };

  const resetFormulario = () => {
    form.resetFields();
    setIdCategoria(null);
    setEditando(false);
  };

  return (
    <>
      <h3>Seleccionar categoría para editar/eliminar</h3>
      <Select
        style={{ width: 400, marginBottom: 20 }}
        placeholder="Selecciona una categoría existente"
        onChange={onSelectCategoria}
        allowClear
      >
        {Array.isArray(categorias) &&
          categorias.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.nombre}
            </Option>
          ))}
      </Select>

      <Form
        form={form}
        name="categoriaForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Ingresa un nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="categoria_anterior"
          label="Categoría Anterior"
          rules={[{ required: true }]}
        >
         <Input />
        </Form.Item>

        <Form.Item
          name="categoria_federal"
          label="Categoría Federal"
          rules={[{ required: true }]}
        >
         <Input />
        </Form.Item>

        <Form.Item
          name="categoria_estatal"
          label="Categoría Estatal"
          rules={[{ required: true }]}
        >
         <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {editando ? "Editar" : "Agregar"}
          </Button>

          {editando && (
            <Button style={{ marginLeft: 10 }} onClick={resetFormulario}>
              Cancelar
            </Button>
          )}

          {idCategoria && (
            <Button danger style={{ marginLeft: 10 }} onClick={handleEliminar}>
              Eliminar
            </Button>
          )}
        </Form.Item>

      </Form>
    </>
  );
};

export default Categoria;