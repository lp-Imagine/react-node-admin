import React from "react";
import { Row, Col } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import "./index.scss";

const chartList = [
  {
    type: "User",
    icon: <UserOutlined style={{ fontSize: 60, color: "#36a3f7" }} />,
    background: "rgb(211, 104, 170)",
    num: 102400,
  },
  {
    type: "Messages",
    icon: <MessageOutlined style={{ fontSize: 60, color: "#f4516c" }} />,
    num: 81212,
    background: "rgb(20, 175, 202)",
  },
  {
    type: "Purchases",
    icon: <PayCircleOutlined style={{ fontSize: 60, color: "#f6ab40" }} />,
    num: 9280,
    background: "rgb(35, 202, 20)",
  },
  {
    type: "Shoppings",
    icon: <ShoppingCartOutlined style={{ fontSize: 60, color: "#b4ee2e" }} />,
    num: 13600,
    background: "rgb(219, 117, 117)",
  },
];

const PanelGroup = (props) => {
  const { handleSetLineChartData } = props;
  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            onClick={handleSetLineChartData.bind(this, chart.type)}
            className="card-panel-col"
          >
            <div
              className="card-panel"
              style={{ background: chart.background }}
            >
              <div className="card-panel-icon-wrapper">{chart.icon}</div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
