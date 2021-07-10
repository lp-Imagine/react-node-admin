import React from "react";
import { Card } from "antd";
import Markdown from "@/components/MarkDown";
import TypingCard from "@/components/TypingCard";

const MarkdownDemo = () => {
  const cardContent = `
   Markdown编辑器<a href="https://github.com/nhn/tui.editor/tree/master/apps/react-editor" target="_blank">tui.editor</a>。
  `;
  return (
    <div className="app-container">
      <TypingCard title="MarkDown" source={cardContent} />
      <br />
      <Card bordered={false}>
        <Markdown />
      </Card>
    </div>
  );
};

export default MarkdownDemo;
