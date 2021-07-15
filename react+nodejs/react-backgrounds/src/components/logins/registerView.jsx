import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "@/styles/login.scss";
import { encrypt } from "@/utils/index";
import userApi from "@/api/user";
import { withRouter } from "react-router";
import { setToken } from "@/utils/session";
import { setUserToken } from "@/store/actions";
import { getInfo } from "@/store/actions";
import { setStorge } from "@/utils/session";
class RegisterView extends React.Component {
  state = {
    loading: false,
  };
  Active = () => {
    this.props.showViews("login");
  };
  onFinish = (values) => {
    this.onRegister(values);
  };
  /**
   * 注册函数
   */
  onRegister = async (values) => {
    const { history, setUserToken } = this.props;
    //**如果正在注册，则return，防止重复注册*/
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    const hide = message.loading("注册中...", 0);
    //**加密密码*/
    const ciphertext = encrypt(values.password);
    const { ip, adress } = this.props;
    const params = {
      username: values.username.trim(),
      password: ciphertext,
      ip: ip,
      adress: adress,
    };
    try {
      const res = await userApi.register(params);
      this.setState({
        loading: false,
      });
      hide();

      if (res.data.code === 200) {
        message.success(res.data.message);
        setUserToken(res.data.data.token);
        setToken(res.data.data.token);
        // getInfo({ token: res.data.data.id });
        setStorge(res.data.data.id);
        history.push("/home");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {}
  };
  render() {
    return (
      <div className={this.props.className}>
        <div className="login_log">
          <h3 className="title">注册</h3>
          <Form name="normal_login" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input
                autocomplete="off"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                maxLength={16}
                className="my_input"
                onFocus={() => this.setState({ loading: false })}
                onBlur={() => this.setState({ loading: false })}
              />
            </Form.Item>
            <Form.Item
              className="margin_from"
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                maxLength={16}
                className="my_input"
                onFocus={() => this.setState({ loading: false })}
                onBlur={() => this.setState({ loading: false })}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "80px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
              >
                注 册
              </Button>
              <span className="login_register" onClick={this.Active}>
                登录
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect((state) => state.user, { setUserToken, getInfo })(
  withRouter(RegisterView)
);
