import React, { Component } from "react";
import { Card, Progress } from "antd";
import { connect } from "react-redux";
import PanThumb from "@/components/PanThumb";
import Mallki from "@/components//Mallki";
import bgImg from "@/assets/images/6.jpg";
import "./index.scss";
class BoxCard extends Component {
  state = {};
  render() {
    const { avatar } = this.props;
    return (
      <div className="box-card-component">
        <Card
          cover={<img alt="example" src={bgImg} style={{ height: "600px" }} />}
        >
          <div style={{ position: "relative" }}>
            <PanThumb
              image={
                avatar || "https://avatars.githubusercontent.com/u/55044461?v=4"
              }
              className="panThumb"
            />
            <Mallki className="mallki-text" text="imagine" />
            <div style={{ paddingTop: "75px" }} className="progress-item">
              <span>Vue</span>
              <Progress percent={50} />
            </div>
            <div className="progress-item">
              <span>React</span>
              <Progress percent={15} />
            </div>
            <div className="progress-item">
              <span>Node.js</span>
              <Progress percent={5} />
            </div>
            <div className="progress-item">
              <span>JavaScript</span>
              <Progress percent={18} />
            </div>
            <div className="progress-item">
              <span>Css</span>
              <Progress percent={12} />
            </div>
            <div className="progress-item">
              <span>Html</span>
              <Progress percent={100} />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default connect((state) => state.user)(BoxCard);
