import React from "react";
import { Table, Button, Divider, Card, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TypingCard from "@/components/TypingCard";
import usersApi from "@/api/user";
import EditForm from "../user/userInfoForm/editForm";
class UserList extends React.Component {
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
  };
  componentDidMount() {
    this.getUserList();
  }
  getUserList = () => {
    usersApi.getUsers({}).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          users: res.data.data,
        });
      } else {
        message.error(res.data.message);
      }
    });
  };
  handleEditUser = (row) => {
    console.log(row, "row");
    this.setState({
      currentRowData: Object.assign({}, row),
      editUserModalVisible: true,
    });
  };
  handleCancel = (_) => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleDeleteUser = (row) => {
    const { role, id } = row;
    if (role === "admin") {
      message.error("不能删除管理员用户！");
      return;
    }
    this.deleteUser({ id });
  };
  //**删除用户 */
  deleteUser = (params) => {
    usersApi.deleteUser(params).then((res) => {
      if (res.data.code !== 200) {
        message.error(res.data.message);
        return;
      }
      this.getUserList();
      message.success(res.data.message);
    });
  };
  onCreate = (values) => {
    console.log(values, "values====");
    usersApi.editUserInfo(values).then((res) => {
      if (res.data.code === 200) {
        //**修改成功，刷新列表数据 */
        this.setState({
          editUserModalVisible: false,
        });
        this.getUserList();
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "系统角色",
        dataIndex: "role",
      },
      {
        title: "密码",
        dataIndex: "password",
      },
      {
        title: "描述",
        dataIndex: "title",
      },
      {
        title: "操作",
        dataIndex: "action",
        render: (text, row) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              title="编辑"
              onClick={this.handleEditUser.bind(null, row)}
            />
            <Divider type="vertical" />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              title="删除"
              onClick={this.handleDeleteUser.bind(null, row)}
            />
          </span>
        ),
      },
    ];
    const { users, editUserModalVisible, confirmLoading, currentRowData } =
      this.state;
    const cardContent = `系统中的用户管理。`;
    return (
      <div className="app-container">
        <TypingCard title="用户管理" source={cardContent} />
        <br />
        <Card>
          <Table
            bordered
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={users}
          ></Table>
        </Card>
        <EditForm
          visible={editUserModalVisible}
          onCreate={this.onCreate}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
          currentRowData={currentRowData}
        />
      </div>
    );
  }
}
export default UserList;
