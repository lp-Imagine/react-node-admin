import React from "react";
import { Modal, Form, Input, Select } from "antd";

const EditUser = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onCreate, confirmLoading, currentRowData } = props;
  const { id, username, role, title, password } = currentRowData;
  form.setFieldsValue({
    id,
    username,
    role,
    title,
    password,
  });
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  };
  return (
    <Modal
      visible={visible}
      title="编辑"
      okText="确定"
      cancelText="取消"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form {...formItemLayout} form={form} name="form_in_modal">
        <Form.Item
          name="id"
          label="用户ID"
          initialValue={id}
          rules={[
            {
              required: true,
              message: "请填写用户ID！",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="username"
          label="用户名称"
          initialValue={username}
          rules={[
            {
              required: true,
              message: "请填写用户名称！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          initialValue={password}
          rules={[
            {
              required: true,
              message: "请填写用户密码！",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="系统角色"
          initialValue={role}
          rules={[
            {
              required: true,
              message: "请选择系统角色！",
            },
          ]}
        >
          <Select style={{ width: 120 }}>
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="editor">普通角色</Select.Option>
            <Select.Option value="guest">游客</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="title" label="描述" initialValue={title}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
