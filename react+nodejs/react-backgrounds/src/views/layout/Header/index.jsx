import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Modal, Layout, Avatar } from "antd";
import { Link } from "react-router-dom";
import { logout, getInfo, setInfoVisible } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import "./index.scss";
const { Header } = Layout;

const LayoutHeader = (props) => {
  const {
    token,
    id,
    avatar,
    sidebarCollapsed,
    setInfoVisible,
    logout,
    showSettings,
    fixedHeader,
  } = props;
  // id && getInfo({ id });
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token);
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="/home">
        <Link to="/home">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="https://github.com/lp-Imagine/react-node-admin"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="setinfo" onClick={setInfoVisible}>
        个人中心
      </Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar
                  shape="square"
                  size="medium"
                  src={
                    avatar ||
                    "https://avatars.githubusercontent.com/u/55044461?v=4"
                  }
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, {
  logout,
  setInfoVisible,
})(LayoutHeader);
