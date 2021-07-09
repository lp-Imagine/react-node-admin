import React from "react";
import { Table, Button, Divider, Card, message, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TypingCard from "@/components/TypingCard";
import usersApi from "@/api/user";
import EditForm from "../user/userInfoForm/editForm";
class UserList extends React.Component {
  state = {
    users: [],
    list: [],
    loading: false,
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
    total: 0,
    listQuery: {
      pageNumber: 1,
      pageSize: 5,
    },
  };
  componentDidMount() {
    this.getUserList();
  }
  getUserList = () => {
    this.setState({
      loading: true,
    });
    usersApi.getUsers({}).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        if (!data) return;
        this.setState({
          users: data,
          total: data.length,
          loading: false,
        });
        this.currentPage();
      } else {
        message.error(res.data.message);
      }
    });
  };
  handleEditUser = (row) => {
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
  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber,
        },
      }),
      () => {
        this.getUserList();
      }
    );
  };
  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          pageNumber: 1,
          pageSize,
        },
      }),
      () => {
        this.getUserList();
      }
    );
  };
  //**前端控制分页 */
  currentPage = () => {
    const { pageNumber, pageSize } = this.state.listQuery;
    const userList = this.state.users;
    if (!userList.length) return;
    this.setState({
      list: userList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
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
        title: "IP",
        dataIndex: "ip",
      },
      {
        title: "Adress",
        dataIndex: "adress",
      },
      {
        title: "注册时间",
        dataIndex: "createDate",
      },
      {
        title: "登录时间",
        dataIndex: "loginDate",
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
    const {
      list,
      loading,
      editUserModalVisible,
      confirmLoading,
      currentRowData,
      total,
      listQuery,
    } = this.state;
    const cardContent = `系统中的用户管理。`;
    return (
      <div className="app-container">
        <TypingCard title="用户管理" source={cardContent} />
        <br />
        <Card>
          <Table
            bordered
            pagination={false}
            loading={loading}
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={list}
          ></Table>
          <br />
          <Pagination
            total={total}
            pageSizeOptions={["5", "10", "20", "40"]}
            showTotal={(total) => `共${total}条数据`}
            pageSize={listQuery.pageSize}
            hideOnSinglePage={true}
            current={listQuery.pageNumber}
            onChange={this.changePage}
            onShowSizeChange={this.changePageSize}
            showSizeChanger
            showQuickJumper
          />
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
