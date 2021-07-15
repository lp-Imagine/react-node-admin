import React, { Component } from "react";
import { removeToken } from "@/utils/session";
import LoginView from "@/components/logins/loginView";
import RegisterView from "@/components/logins/registerView";
import Background from "@/components/Background";
import Axios from "axios";
import "@/styles/basic.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "login", //**登录/注册面板 */
      ip: "",
      adress: "",
    };
  }

  componentDidMount() {
    removeToken();
    this.getUserIp();
  }
  getUserIp = () => {
    Axios.get("/cityjson?ie=utf-8").then((res) => {
      const { data } = res;
      const dataStr = data.split("=")[1].replace(/;/g, "");
      const adressObj = JSON.parse(dataStr);
      this.setState(
        {
          ip: adressObj.cip,
          adress: adressObj.cname,
        },
        () => {
          console.log(this.state, "state");
        }
      );
    });
  };
  showViews = (show) => {
    this.setState({
      show,
    });
  };

  render() {
    return (
      <Background url="https://imagineblog.vercel.app/img/banner/6.jpg">
        <div className="container">
          <div className="login_view__title">
            <h3>后台管理系统Demo</h3>
          </div>

          <LoginView
            showViews={this.showViews}
            showStatus={this.state.show}
            ip={this.state.ip}
            adress={this.state.adress}
            className={
              this.state.show === "login" ? "box showBox" : "box hiddenBox"
            }
          />

          <RegisterView
            showViews={this.showViews}
            ip={this.state.ip}
            adress={this.state.adress}
            className={
              this.state.show === "register" ? "box showBox" : "box hiddenBox"
            }
          />
        </div>
      </Background>
    );
  }
}

export default Login;
