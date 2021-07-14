import React, { useState } from "react";
import { Typography, Card, Row, Col, Space, Switch } from "antd";
import {
  HighlightOutlined,
  SmileOutlined,
  SmileFilled,
} from "@ant-design/icons";
import TypingCard from "@/components/TypingCard/index";

const { Title, Link, Text, Paragraph } = Typography;

const TypographyDemo = () => {
  const [ellipsis, setEllipsis] = useState(true);
  const [editableStr, setEditableStr] = useState("这是一个可编辑的文本。");
  const [customIconStr, setCustomIconStr] =
    useState("自定义编辑图标和替换工具提示文本。");
  const [hideTooltipStr, setHideTooltipStr] = useState("隐藏编辑工具提示。");
  const [lengthLimitedStr, setLengthLimitedStr] =
    useState("这是一个可编辑的文本长度有限。");
  const cardContent = `<ul><li>当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。</li>
    <li>当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。</li></ul>`;
  return (
    <div style={{ padding: 24 }}>
      <TypingCard title="Typography排版文本的基本格式。" source={cardContent} />
      <br />
      <Row gutter={20}>
        <Col span={12}>
          <Card hoverable bordered={false} style={{ marginBottom: 24 }}>
            <Title>h1. Ant Design</Title>
            <Title level={2}>h2. Ant Design</Title>
            <Title level={3}>h3. Ant Design</Title>
            <Title level={4}>h4. Ant Design</Title>
            <Title level={5}>h5. Ant Design</Title>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable bordered={false} style={{ marginBottom: 24 }}>
            <Space direction="vertical">
              <Text>Ant Design (default)</Text>
              <Text type="secondary">Ant Design (secondary)</Text>
              <Text type="success">Ant Design (success)</Text>
              <Text type="warning">Ant Design (warning)</Text>
              <Text type="danger">Ant Design (danger)</Text>
              <Text disabled>Ant Design (disabled)</Text>
              <Text mark>Ant Design (mark)</Text>
              <Text code>Ant Design (code)</Text>
              <Text keyboard>Ant Design (keyboard)</Text>
              <Text underline>Ant Design (underline)</Text>
              <Text delete>Ant Design (delete)</Text>
              <Text strong>Ant Design (strong)</Text>
              <Text italic>Ant Design (italic)</Text>
              <Link href="https://ant.design" target="_blank">
                Ant Design (Link)
              </Link>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable bordered={false} style={{ marginBottom: 24 }}>
            <Paragraph editable={{ onChange: setEditableStr }}>
              {editableStr}
            </Paragraph>
            <Paragraph
              editable={{
                icon: <HighlightOutlined />,
                tooltip: "click to edit text",
                onChange: setCustomIconStr,
              }}
            >
              {customIconStr}
            </Paragraph>
            <Paragraph
              editable={{ tooltip: false, onChange: setHideTooltipStr }}
            >
              {hideTooltipStr}
            </Paragraph>
            <Paragraph
              editable={{
                onChange: setLengthLimitedStr,
                maxLength: 50,
                autoSize: { maxRows: 5, minRows: 3 },
              }}
            >
              {lengthLimitedStr}
            </Paragraph>
            <Paragraph copyable>这是一个复制文本。</Paragraph>
            <Paragraph copyable={{ text: "Hello, Ant Design!" }}>
              替换文本副本。
            </Paragraph>
            <Paragraph
              copyable={{
                icon: [
                  <SmileOutlined key="copy-icon" />,
                  <SmileFilled key="copied-icon" />,
                ],
                tooltips: ["click here", "you clicked!!"],
              }}
            >
              自定义图标和替换工具提示文本副本。
            </Paragraph>
            <Paragraph copyable={{ tooltips: false }}>
              隐藏复制工具提示。
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Switch
              checked={ellipsis}
              onChange={() => {
                setEllipsis(!ellipsis);
              }}
            />
            <Paragraph ellipsis={ellipsis}>
              Ant Design, a design language for background applications, is
              refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team. Ant Design, a design language for background applications,
              is refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team.
            </Paragraph>
            <Paragraph
              ellipsis={
                ellipsis
                  ? {
                      rows: 2,
                      expandable: true,
                      symbol: "more",
                    }
                  : false
              }
            >
              Ant Design, a design language for background applications, is
              refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team. Ant Design, a design language for background applications,
              is refined by Ant UED Team. Ant Design, a design language for
              background applications, is refined by Ant UED Team. Ant Design, a
              design language for background applications, is refined by Ant UED
              Team.
            </Paragraph>

            <Text
              style={
                ellipsis
                  ? {
                      width: 100,
                    }
                  : undefined
              }
              ellipsis={
                ellipsis
                  ? {
                      tooltip: "I am ellipsis now!",
                    }
                  : false
              }
            >
              Ant Design, a design language for background applications, is
              refined by Ant UED Team.
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TypographyDemo;
