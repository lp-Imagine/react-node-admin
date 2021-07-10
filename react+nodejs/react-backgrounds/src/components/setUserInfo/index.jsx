import React from "react";
import { connect } from "react-redux";
import { setInfoVisible } from "@/store/actions";
import { Modal, message, Select, Form, Input } from "antd";
import usersApi from "@/api/user";
import "./index.scss";

const SetUserInfo = (props) => {
  const { infoVisible, setInfoVisible, username, role, title, id } = props;

  const handleUserInfo = (values) => {
    editUsers(values);
  };

  //**编辑个人信息 */
  const editUsers = (values) => {
    usersApi.editUserInfo(values).then((res) => {
      if (res.data.code !== 200) {
        message.error(res.data.message);
        return;
      }
      message.success(res.data.message);
      setInfoVisible();
    });
  };

  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="信息设置"
        okText="确定"
        cancelText="取消"
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
        <Form
          form={form}
          name="form_in_modal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="用户ID" name="id" initialValue={id}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="username"
            initialValue={username}
            label="用户名"
            rules={[
              {
                required: true,
                message: "请填写用户名!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请填写密码!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="系统角色" initialValue={role}>
            <Select style={{ width: 120 }} disabled>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="editor">普通角色</Select.Option>
              <Select.Option value="guest">游客</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" initialValue={title} label="描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <CollectionCreateForm
        visible={infoVisible}
        onCreate={handleUserInfo}
        onCancel={setInfoVisible}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.user,
  };
};
export default connect(mapStateToProps, { setInfoVisible })(SetUserInfo);
