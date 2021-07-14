import React from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { getMenuItemInMenuListByProperty } from "@/utils";
import routeList from "@/router/pageMap";
import pageList from "@/router/pageConfig";
const { Content } = Layout;

const getPageTitle = (pageList, pathname) => {
  let title = "后台管理Demo";
  let item = getMenuItemInMenuListByProperty(pageList, "path", pathname);
  if (item) {
    title = `${item.title} - 后台管理Demo`;
  }
  return title;
};

const FullPages = (props) => {
  const { role, location } = props;
  const { pathname } = location;
  const handleFilter = (route) => {
    // 过滤没有权限的页面
    return role === "admin" || !route.roles || route.roles.includes(role);
  };
  return (
    <DocumentTitle title={getPageTitle(pageList, pathname)}>
      <Content style={{ height: "calc(100% - 100px)" }}>
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={500}
            classNames="fade"
            exit={false}
          >
            <Switch location={location}>
              <Redirect exact from="/" to="/home" />
              {routeList.map((route) => {
                return (
                  handleFilter(route) &&
                  route && (
                    <Route
                      component={route.component}
                      key={route.path}
                      path={route.path}
                    />
                  )
                );
              })}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  );
};

export default connect((state) => state.user)(withRouter(FullPages));
