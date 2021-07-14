import React, { Component } from "react";
import { Button, Card, Row, Col, Menu, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import TypingCard from "@/components/TypingCard/index";

class ButtonDemo extends Component {
  state = {};
  render() {
    const cardContent = `<ol>
      <li><code>主按钮：</code>用于主行动点，一个操作区域只能有一个主按钮。</li>
      <li><code>默认按钮：</code>用于没有主次之分的一组行动点。</li>
      <li><code>虚线按钮：</code>常用于添加操作。</li>
      <li><code>文本按钮：</code>用于最次级的行动点。</li>
      <li><code>链接按钮：</code>用于作为外链的行动点。</li></ol>
      以及四种状态属性与上面配合使用。<br />
      <ol><li><code>危险：</code>删除/移动/修改权限等危险操作，一般需要二次确认。</li>
      <li><code>幽灵：</code>用于背景色比较复杂的地方，常用在首页/产品页等展示场景。</li>
      <li><code>禁用：</code>行动点不可用的时候，一般需要文案解释。</li>
      <li><code>加载中：</code>用于异步操作等待反馈的时候，也可以避免多次提交。</li></ol>`;
    const menu = (
      <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    return (
      <div style={{ padding: 24 }}>
        <TypingCard
          title="标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。"
          source={cardContent}
        />
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Card hoverable bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <Button type="primary">Primary</Button>&emsp;
                <Button>Default</Button>&emsp;
                <Button type="dashed">Dashed</Button>&emsp;
                <Button type="danger">Danger</Button>
                <br />
                <br />
                <Button type="primary" ghost>
                  Primary
                </Button>
                &emsp;
                <Button ghost>Default</Button>&emsp;
                <Button type="dashed" ghost>
                  Dashed
                </Button>
                &emsp;
                <Button type="danger" ghost>
                  danger
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
                &emsp;
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
                &emsp;
                <Button shape="circle" icon={<SearchOutlined />} />
                &emsp;
                <Button icon={<SearchOutlined />}></Button>
                <br />
                <br />
                <Button shape="circle" icon={<SearchOutlined />} />
                &emsp;
                <Button icon={<SearchOutlined />}></Button>&emsp;
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
                &emsp;
                <Button type="dashed" icon={<SearchOutlined />}>
                  Search{" "}
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable bordered={false}>
              <div style={{ width: "50%" }}>
                <Button
                  type="primary"
                  block
                  loading
                  style={{ marginBottom: 8 }}
                >
                  Primary
                </Button>
                <Button block style={{ marginBottom: 8 }}>
                  Default
                </Button>
                <Button type="dashed" block style={{ marginBottom: 8 }}>
                  Dashed
                </Button>
                <Button type="danger" block style={{ marginBottom: 8 }}>
                  Danger
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable bordered={false}>
              <Button type="primary" loading>
                primary
              </Button>
              &emsp;
              <Button>secondary</Button>&emsp;
              <Dropdown overlay={menu}>
                <Button>
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ButtonDemo;
