const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "imagine",
    password: "123456",
    token: "admin-token",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    title: "拥有系统内所有菜单和路由权限",
    createDate: "2021-07-09 15:16:25",
    loginDate:
      new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "普通用户",
    password: "123456",
    token: "editor-token",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    title: "可以看到除户管理页面之外的所有页面",
    createDate: "2021-07-09 15:16:25",
    loginDate:
      new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    password: "123456",
    token: "guest-token",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    title: "",
    createDate: "2021-07-09 15:16:25",
    loginDate:
      new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
  },
};

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body);
    const token = tokens[username];
    const data = users[token];
    if (!token) {
      return {
        code: -1,
        message: "用户名或密码错误",
      };
    }
    return {
      code: 200,
      message: "登录成功",
      data: data,
    };
  },
  getUserInfo: (config) => {
    const id = config.body;
    const userInfo = users[`${id}-token`];
    if (!userInfo) {
      return {
        code: -1,
        message: "获取用户信息失败",
      };
    }
    return {
      code: 200,
      message: "操作成功",
      userInfo,
    };
  },
  getUsers: () => {
    return {
      code: 200,
      users: Object.values(users),
    };
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body);
    const token = tokens[id];
    if (token) {
      delete tokens[id];
      delete users[token];
    }
    return {
      code: 200,
      message: "删除成功",
    };
  },
  editUserInfo: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    const token = tokens[id];
    if (token) {
      users[token] = { ...users[token], ...data };
    }
    return {
      code: 200,
    };
  },
  ValidatUserID: (config) => {
    const userID = config.body;
    const token = tokens[userID];
    if (token) {
      return {
        status: 1,
      };
    } else {
      return {
        status: 0,
      };
    }
  },
  addUser: (config) => {
    const data = JSON.parse(config.body);
    const { id } = data;
    tokens[id] = `${id}-token`;
    users[`${id}-token`] = {
      ...users["guest-token"],
      ...data,
    };
    return {
      status: 0,
    };
  },
  logout: (_) => {
    return {
      code: 200,
      message: "注销成功",
    };
  },
};
