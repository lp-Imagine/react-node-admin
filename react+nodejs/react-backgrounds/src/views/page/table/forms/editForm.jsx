import React from "react";
import { Form, Input, DatePicker, Select, Rate, Modal } from "antd";
import moment from "moment";
const EditForm = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onOk, confirmLoading, currentRowData } = props;
  const { id, author, date, readings, star, status, title } = currentRowData;
  if (visible) {
    form.setFieldsValue({
      id,
      author,
      date: date ? moment(date) : null,
      readings,
      star,
      status,
      title,
    });
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

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
      title="编辑"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form {...formItemLayout} form={form} name="form_in_modal">
        <Form.Item name="id" label="序号" initialValue={id}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="title"
          label="标题"
          initialValue={title}
          rules={[{ required: true, message: "请输入标题!" }]}
        >
          <Input placeholder="标题" />
        </Form.Item>
        <Form.Item name="author" label="作者" initialValue={author}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="readings" label="阅读量" initialValue={readings}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="star" label="推荐指数" initialValue={star}>
          <Rate count={3} />
        </Form.Item>
        <Form.Item name="status" label="状态" initialValue={status}>
          <Select style={{ width: 120 }}>
            <Select.Option value="published">published</Select.Option>
            <Select.Option value="draft">draft</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="时间"
          initialValue={date}
          rules={[{ type: "object", required: true, message: "请选择时间!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
