import React, { useEffect, useState } from "react";
import { Button, Form, Select, message } from "antd";
import { obtenerCategorias, obtenerTipoRequisitos } from "../services/ServiceCategoria";
import { asignarTipoACategoria } from "../services/ServiceCategoria";

const { Option } = Select;

const CategoriaRequisito = () => {
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cats = await obtenerCategorias();
        const tipos = await obtenerTipoRequisitos();
        setCategorias(cats);
        setTipos(tipos);
      } catch (error) {
        message.error("Error al cargar categorías o tipos");
      }
    };
    cargarDatos();
  }, []);

  const onFinish = async (values) => {
    try {
      await asignarTipoACategoria(values.categoria, values.tipo);
      message.success("Asignación exitosa");
    } catch (error) {
      message.error("Error al asignar tipo a categoría");
    }
  };

  return (
    <Form
      name="asignar"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Categoría" name="categoria" rules={[{ required: true, message: "Selecciona una categoría" }]}>
        <Select placeholder="Selecciona una categoría">
          {categorias.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.nombre}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Tipo" name="tipo" rules={[{ required: true, message: "Selecciona un tipo" }]}>
        <Select placeholder="Selecciona un tipo">
          {tipos.map((tipo) => (
            <Option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Asignar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoriaRequisito;
