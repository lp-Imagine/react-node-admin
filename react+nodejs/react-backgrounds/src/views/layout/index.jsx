import React from "react";
import { connect } from "react-redux";
import Content from "./Content";
import MyHeader from "./Header";
import RightPanel from "./RightPanel";
import MySider from "./Sider";
import TagsView from "./TagsView";
import SetUserInfo from "@/components/setUserInfo";
import { Layout } from "antd";
const Main = (props) => {
  const { tagsView } = props;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MySider />
      <Layout>
        <MyHeader />
        {tagsView ? <TagsView /> : null}
        <Content />
        <RightPanel />
        <SetUserInfo />
      </Layout>
    </Layout>
  );
};
export default connect((state) => state.settings)(Main);
