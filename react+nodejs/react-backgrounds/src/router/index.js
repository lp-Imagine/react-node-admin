/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:55:29
 * @LastEditors: peng
 * @LastEditTime: 2021-07-14 15:50:03
 */
import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getInfo } from "@/store/actions";
import Routes from "./routes"
// import PermissionAuth from "./permissionAuth";
// import routerList from "./routerMap";
// import pageList from "./pageMap";
import Layout from "@/views/layout";
import Login from "@/views/login";
// import MyDataV from "@/views/myDataV";
// import NoFound from "@/views/404";
class Router extends React.Component {
  render() {
    // console.log(this.props, "routerprops");
    // const { token, role, getInfo, id } = this.props;
    // console.log("propsrouter", token);
    return (
      <HashRouter>
        {/* <Switch> */}
          {/* <Route path="/login" component={Login} />
          <Route
            // path="/"
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
          /> */}
          <Routes />
        {/* </Switch> */}
      </HashRouter>
      // <Switch>
      //   <PermissionAuth navRouter={routerList} pageRouter={pageList} />
      // </Switch>
    );
  }
}

export default Router
// connect((state) => state.user, { getInfo })(Router);
