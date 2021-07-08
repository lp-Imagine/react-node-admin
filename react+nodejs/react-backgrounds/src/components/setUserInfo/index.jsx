import React, { useState } from "react";
import { connect } from "react-redux";
import { setInfo, setInfoVisible } from "@/store/actions";
import { Modal, Button, Upload, message, Avatar, Form, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.less";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const SetUserInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (info) => {
    console.log(info, "info");
    if (info.file.status === "uploading") {
      setLoading(true);
      // return;
    }
    // if (info.file.status === "done") {
    // Get this url from response in real world.

    getBase64(info.file.originFileObj, (imageUrl) => {
      setLoading(false);
      setImageUrl(imageUrl);
    });
  };

  const handleUserInfo = (values) => {
    console.log(values, "fromvalues");
    props.setInfoVisible();
  };

  const { infoVisible, setInfoVisible, name, avatar, role } = props;
  if (avatar) {
    setImageUrl(avatar);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    console.log(form, "form");
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
          <Form.Item label="头像" name="imageUrl" initialValue={imageUrl}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <Avatar
                  src={imageUrl}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            initialValue={name}
            label="用户名"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="修改密码"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input.Password />
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
export default connect(mapStateToProps, { setInfo, setInfoVisible })(
  SetUserInfo
);
