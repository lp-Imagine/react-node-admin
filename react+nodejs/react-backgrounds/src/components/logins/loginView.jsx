import React from "react";
import { withRouter } from "react-router";
import { Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { randomNum, encrypt } from "@/utils/index";
import "@/styles/login.scss";
import { reqLogin } from "@/store/actions";
import { getInfo } from "@/store/actions";
import { setStorge } from "@/utils/session";
class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "", //**验证码 */
      loading: false, //** 当前焦点聚焦在哪一项上*/
      ip: "",
      adress: "",
    };
  }

  componentDidMount() {
    this._createCode();
  }
  //**生成验证码 */
  _createCode = () => {
    const ctx = this.canvas.getContext("2d");
    const chars = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    let code = "";
    ctx.clearRect(0, 0, 80, 40);
    for (let i = 0; i < 4; i++) {
      const char = chars[randomNum(0, 57)];
      code += char;
      ctx.font = randomNum(20, 25) + "px SimHei"; //设置字体随机大小
      ctx.fillStyle = "#D3D7F7";
      ctx.textBaseline = "middle";
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      let x = (80 / 5) * (i + 1);
      let y = 40 / 2;
      let deg = randomNum(-25, 25);
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(char, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    this.setState({
      code,
    });
  };

  //**转换面板为注册面板*/
  Active = () => {
    this.props.showViews("register");
  };

  //**表单验证成功后的登录函数*/
  onLogin = (values) => {
    const { reqLogin, history } = this.props;

    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    });
    //**加密密码*/
    const ciphertext = encrypt(values.password);
    const { ip, adress } = this.props;
    const params = {
      username: values.username.trim(),
      password: ciphertext,
      ip: ip,
      adress: adress,
    };

    reqLogin(params)
      .then((res) => {
        message.success(res.message);
        // getInfo({ id: res.data.id });
        setStorge(res.data.id)
        history.push("/home");
      })
      .catch((error) => {
        this._createCode();
        message.error(error);
      });
    this.setState({
      loading: false,
    });
  };

  onFinish = (values) => {
    this.onLogin(values);
  };
  render() {
    const { code, loading } = this.state;
    const canvasBg = this.props.showStatus === "register" ? "canvas_bg" : "";
    return (
      <div className={this.props.className}>
        <div className="login_log">
          <h3 className="title">登录</h3>
          <Form name="normal_login" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                autocomplete="off"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
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
                  message: "请输入密码",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                className="my_input"
                onFocus={() => this.setState({ loading: false })}
                onBlur={() => this.setState({ loading: false })}
              />
            </Form.Item>
            <Form.Item
              name="verification"
              rules={[
                {
                  required: true,
                  validator: (rule, value) => {
                    if (value && value.toUpperCase() !== code.toUpperCase()) {
                      return Promise.reject("验证码错误");
                    } else if (!value) {
                      return Promise.reject("请输入验证码");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <div className="flex_div">
                <div>
                  <Input
                    maxLength={4}
                    placeholder="验证码"
                    className="my_input"
                    onFocus={() => this.setState({ loading: false })}
                    onBlur={() => this.setState({ loading: false })}
                  />
                </div>
                <div className={canvasBg}>
                  <canvas
                    onClick={this._createCode}
                    width="80"
                    height="39"
                    ref={(el) => (this.canvas = el)}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="margin_from">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                登 录
              </Button>
              <span className="login_register" onClick={this.Active}>
                注册
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect((state) => state.user, { reqLogin, getInfo })(
  withRouter(LoginView)
);
