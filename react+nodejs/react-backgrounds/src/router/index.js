/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:55:29
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 17:31:40
 */
import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
class Router extends React.Component {
  render() {
    console.log(this.props, "routerprops");
    const { token, role, getInfo,id } = this.props;
    console.log("propsrouter", token);
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                console.log(token, "登入页");
                return <Login />;
              } else {
                console.log("首页");
                if (role) {
                  return <Layout />;
                } else {
                  getInfo({ id }).then(() => <Layout />);
                }
              }
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => state.user, { getInfo })(Router);
