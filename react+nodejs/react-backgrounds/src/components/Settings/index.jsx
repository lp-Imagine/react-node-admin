import React from "react";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import { toggleSettingPanel } from "@/store/actions";
import { SettingOutlined } from "@ant-design/icons";
import "./index.less";
const Settings = (props) => {
  const { toggleSettingPanel } = props;
  console.log(toggleSettingPanel,'togg')
  return (
    <div className="settings-container">
      <Tooltip placement="bottom" title="系统设置">
        <SettingOutlined onClick={toggleSettingPanel} />
      </Tooltip>
    </div>
  );
};

export default connect(null, { toggleSettingPanel })(Settings);
