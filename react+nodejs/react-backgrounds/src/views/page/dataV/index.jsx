import React from "react";
import { withRouter } from "react-router";
import { Button } from "antd";
import TypingCard from "@/components/TypingCard";

class DataVDemo extends React.Component {
  render() {
    const cardContent = `数据可视化大屏构建采用<a href="http://datav-react.jiaminghi.com/">DataV-React</a>。`;
    const goDataV = () => {
      const { history } = this.props;
      history.push("/myDataV");
    };
    return (
      <div>
        <TypingCard title="数据可视化面板" source={cardContent} />
        <br />
        <Button type="primary" onClick={goDataV} style={{ margin: 20 }}>
          前往可视化大屏界面
        </Button>
      </div>
    );
  }
}

export default withRouter(DataVDemo);
