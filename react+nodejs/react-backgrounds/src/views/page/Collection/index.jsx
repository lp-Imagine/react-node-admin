import React, { Component } from "react";
import AnimatedBook from "@/components/AnimatedBook";
import {
  GithubOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Card,
  Icon,
  Button,
  Empty,
  Modal,
  Checkbox,
  message,
  Spin,
} from "antd";
import "./index.scss";
import { connect } from "react-redux";
import CreateModal from "./CreateModal";
import { findWorks } from "@/api/works";
import { deleteWorks } from "@/api/works";

class Collection extends Component {
  state = {
    collections: [], //作品列表
    isShowCreateModal: false,
    loading: false,
  };
  componentDidMount() {
    this.getCollections();
  }
  /**
   * 获得作品集数据
   */
  getCollections = async () => {
    this.setState({
      loading: true,
    });
    const res = await findWorks({});
    this.setState({
      collections: res.data.data || [],
      loading: false,
    });
  };
  /**
   * 打开/关闭创建模态框
   */
  toggleShowCreateModal = (visible) => {
    this.setState({
      isShowCreateModal: visible,
    });
  };
  openCreateModal = () => {
    this.toggleShowCreateModal(true);
  };
  openDeleteModal = () => {
    let idList = [];
    Modal.confirm({
      title: "请在下面勾选要删除的项目(仅管理员)",
      content: (
        <div style={{ marginTop: 30 }}>
          <Checkbox.Group onChange={(values) => (idList = values)}>
            {this.state.collections.map((item) => (
              <p key={item.id}>
                <Checkbox value={item.id}>{item.title}</Checkbox>
              </p>
            ))}
          </Checkbox.Group>
        </div>
      ),
      maskClosable: true,
      okButtonProps: {
        disabled: this.props.role !== "admin",
      },
      onOk: async () => {
        const res = await deleteWorks({ idList });
        if (res.data.code === 200) {
          message.success("删除成功");
          this.getCollections();
        }
      },
    });
  };

  render() {
    const { collections, isShowCreateModal, loading } = this.state;
    const colors = ["#f3b47e", "#83d3d3", "#8bc2e8", "#a3c7a3"];
    return (
      <div>
        <Spin spinning={loading}>
          <Card bordered={false}>
            <div style={{ textAlign: "right", marginBottom: 40 }}>
              <Button icon={<PlusOutlined />} onClick={this.openCreateModal}>
                创建
              </Button>
              &emsp;
              <Button
                icon={<DeleteOutlined />}
                type="danger"
                onClick={this.openDeleteModal}
              >
                删除
              </Button>
            </div>
            <div style={styles.box}>
              {collections &&
                collections.map((item, index) => (
                  <AnimatedBook
                    key={item.id}
                    cover={
                      <div
                        className="cover-box"
                        style={{ background: colors[index % 4] }}
                      >
                        <h3 className="title ellipsis">{item.title}</h3>
                        <p className="ellipsis">{item.description}</p>
                      </div>
                    }
                    content={
                      <div className="content-box">
                        <div className="btn">
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GithubOutlined />{" "}
                          </a>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            预览地址
                          </a>
                        </div>
                      </div>
                    }
                    style={{ marginBottom: 100 }}
                  />
                ))}
            </div>
            {!collections.length && <Empty />}
          </Card>
          <CreateModal
            visible={isShowCreateModal}
            toggleVisible={this.toggleShowCreateModal}
            onCreated={this.getCollections}
          />
        </Spin>
      </div>
    );
  }
}

const styles = {
  box: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
};

export default connect((state) => state.user, {})(Collection);
