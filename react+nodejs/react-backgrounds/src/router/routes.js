/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-14 15:45:56
 * @LastEditors: peng
 * @LastEditTime: 2021-07-15 18:33:21
 */
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getInfo } from "@/store/actions";
import routerList from "./routerMap";
import pageList from "./pageMap";
import Layout from "@/views/layout";
import FullPage from "@/views/fullpages";
import Login from "@/views/login";
import NoFound from "@/views/404";

const Routes = (props) => {
  const { id, token, role, getInfo, location } = props;
  const { pathname } = location;
  const splitPath = "/" + pathname.split("/")[1].toString();
  const targetRouterConfigNav = routerList.find(
    (v) => v.path.indexOf(splitPath) !== -1
  );
  const targetRouterConfigPage = pageList.find(
    (e) => e.path.indexOf(splitPath) !== -1
  );

  const Configs = () => {
    if (targetRouterConfigNav || targetRouterConfigPage) {
      return targetRouterConfigNav ? <Layout /> : <FullPage />;
    } else {
      return <NoFound />;
    }
  };

  const RouteView = () => {
    return pathname === "/" ? (
      <Redirect exact from="/" to="/home" />
    ) : (
      <Configs />
    );
  };
  return (
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
              return <RouteView />;
            } else {
              getInfo({ id }).then(() => <RouteView />);
            }
          }
        }}
      />
    </Switch>
  );
};

export default connect((state) => state.user, { getInfo })(withRouter(Routes));
