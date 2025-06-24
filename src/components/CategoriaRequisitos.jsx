import { Button, Checkbox, Form, Input, Select } from "antd";
const { Option } = Select;
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const CategoriaRequisito = () => (
  <div>
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

      <Form.Item label="Categoria" name="categoria">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecciona una opción"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Tipo 1">categoria 1</Option>
          <Option value="Tipo 2">categoria 2</Option>
          <Option value="Tipo 3">categoria 3</Option>
          <Option value="Tipo 4">categoria 4</Option>
        </Select>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

            <Form.Item label="Tipo" name="tipo">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecciona una opción"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Tipo 1">Tipo 1</Option>
          <Option value="Tipo 2">Tipo 2</Option>
          <Option value="Tipo 3">Tipo 3</Option>
          <Option value="Tipo 4">Tipo 4</Option>
        </Select>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);
export default CategoriaRequisito;
