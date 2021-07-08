import React, { Component } from "react";
import LoginView from "@/components/logins/loginView";
import RegisterView from "@/components/logins/registerView";
import "@/styles/basic.less";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "login", //**登录/注册面板 */
    };
  }

  showViews = (show) => {
    this.setState({
      show,
    });
  };

  render() {
    return (
      <div className="page_login">
        <div className="container">
          <LoginView
            showViews={this.showViews}
            showStatus={this.state.show}
            // props={this.props}
            className={
              this.state.show === "login" ? "box showBox" : "box hiddenBox"
            }
          />

          <RegisterView
            showViews={this.showViews}
            className={
              this.state.show === "register" ? "box showBox" : "box hiddenBox"
            }
          />
        </div>
      </div>
    );
  }
}

export default Login;
