/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-10 14:14:16
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 16:27:32
 */
import React from "react";
import { Form, Input, message, Modal } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { addWorks } from "@/api/works";
import { connect } from "react-redux";

const { TextArea } = Input;

const CreateModal = (props) => {
  const { visible, role, toggleVisible, onCreated } = props;
  const [form] = Form.useForm();
  const onCancel = () => {
    toggleVisible(false);
  };
  const onOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };
  const onCreate = (values) => {
    addWorks(values).then((res) => {
      if (res.data.code !== 200) {
        message.error(res.data.message);
        return;
      }
      message.success(res.data.message);
      onCreated(); //更新页面的数据
      onCancel();
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal
      visible={visible}
      title="新增作品(仅管理员)"
      centered
      onCancel={onCancel}
      okButtonProps={{ disabled: role !== "admin" }}
      onOk={onOk}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label={"项目名称"}
          name="title"
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label={"项目描述"}
          name="description"
          rules={[{ required: true, message: "请输入项目描述" }]}
        >
          <TextArea placeholder="请输入项目描述" />
        </Form.Item>
        <Form.Item
          label={"预览地址"}
          name="url"
          rules={[
            { required: true, message: "请输入项目预览地址" },
            { type: "url", message: "请输入正确的网址" },
          ]}
        >
          <Input placeholder="请输入项目预览地址" />
        </Form.Item>
        <Form.Item
          label={
            <span>
              <GithubOutlined /> 地址
            </span>
          }
          name="githubUrl"
          rules={[
            { required: true, message: "请输入项目github地址" },
            { type: "url", message: "请输入正确的网址" },
          ]}
        >
          <Input placeholder="请输入项目github地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect((state) => state.user, {})(CreateModal);
