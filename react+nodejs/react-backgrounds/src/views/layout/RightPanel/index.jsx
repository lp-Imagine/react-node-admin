import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Switch, Row, Col, Divider } from "antd";
import { toggleSettingPanel, changeSetting } from "@/store/actions";

const RightPanel = (props) => {
  const {
    settingPanelVisible,
    toggleSettingPanel,
    changeSetting,
    sidebarLogo: defaultSidebarLogo,
    fixedHeader: defaultFixedHeader,
    tagsView: defaultTagsView,
  } = props;

  const [sidebarLogo, setSidebarLogo] = useState(defaultSidebarLogo);
  const [fixedHeader, setFixedHeader] = useState(defaultFixedHeader);
  const [tagsView, setTagsView] = useState(defaultTagsView);

  const sidebarLogoChange = (checked) => {
    setSidebarLogo(checked);
    changeSetting({ key: "sidebarLogo", value: checked });
  };

  const fixedHeaderChange = (checked) => {
    setFixedHeader(checked);
    changeSetting({ key: "fixedHeader", value: checked });
  };

  const tagsViewChange = (checked) => {
    setTagsView(checked);
    changeSetting({ key: "tagsView", value: checked });
  };

  return (
    <div className="rightSettings">
      <Drawer
        title="系统设置"
        placement="right"
        width={350}
        onClose={toggleSettingPanel}
        visible={settingPanelVisible}
      >
        <Row>
          <Col span={12}>
            <span>侧边栏 Logo</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={sidebarLogo}
              onChange={sidebarLogoChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>固定 Header</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={fixedHeader}
              onChange={fixedHeaderChange}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col span={12}>
            <span>开启 Tags-View</span>
          </Col>
          <Col span={12}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked={tagsView}
              onChange={tagsViewChange}
            />
          </Col>
        </Row>
        <Divider dashed />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.settings,
  };
};

export default connect(mapStateToProps, { toggleSettingPanel, changeSetting })(
  RightPanel
);
