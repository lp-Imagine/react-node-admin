import React, { useState, useEffect } from "react";
import screenfull from "screenfull";
import { message, Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import "./index.less";

const click = () => {
  if (!screenfull.isEnabled) {
    message.warning("you browser can not work");
    return false;
  }
  screenfull.toggle();
};

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const change = () => {
    setIsFullscreen(screenfull.isFullscreen);
  };

  useEffect(() => {
    screenfull.isEnabled && screenfull.on("change", change);
    return () => {
      screenfull.isEnabled && screenfull.off("change", change);
    };
  }, []);

  const title = isFullscreen ? "取消全屏" : "全屏";
  const type = isFullscreen ? (
    <FullscreenOutlined onClick={click} />
  ) : (
    <FullscreenExitOutlined onClick={click} />
  );
  return (
    <div className="fullScreen-container">
      <Tooltip placement="bottom" title={title}>
        {type}
        {/* <Icon type={type} onClick={click} /> */}
      </Tooltip>
    </div>
  );
};

export default FullScreen;
