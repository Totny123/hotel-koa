const defaultRoutes = [
  {
    alwaysShow: true,
    children: [
      {
        name: "CheckIn",
        path: "checkIn",
        hidden: false,
        component: "register/checkIn/index",
        meta: {
          icon: "user",
          link: null,
          noCache: false,
          title: "入住登记",
          noCache: true,
        },
      },
      {
        name: "CheckOut",
        path: "checkOut",
        hidden: false,
        component: "register/checkOut/index",
        meta: {
          icon: "user",
          link: null,
          noCache: false,
          title: "退房登记",
          noCache: true,
        },
      },
    ],
    component: "Layout",
    hidden: false,
    name: "Register",
    path: "/register",
    redirect: "noRedirect",
    meta: {
      title: "登记管理",
      noCache: false,
      link: null,
      icon: "system",
      noCache: true,
    },
  },
  {
    path: "/customer",
    component: "Layout",
    redirect: "index",
    children: [
      {
        path: "index",
        component: "customer/index",
        name: "Customer",
        meta: { title: "客户管理", icon: "dashboard" },
        noCache: true,
      },
    ],
  },
  {
    path: "/order",
    component: "Layout",
    redirect: "index",
    children: [
      {
        path: "index",
        component: "order/index",
        name: "Order",
        meta: { title: "订单管理", icon: "dashboard" },
        noCache: true,
      },
    ],
  },
  {
    alwaysShow: true,
    children: [
      {
        name: "RoomList",
        path: "list",
        hidden: false,
        component: "room/index",
        meta: {
          icon: "user",
          link: null,
          noCache: false,
          title: "客房列表",
          noCache: true,
        },
      },
      {
        name: "RoomType",
        path: "type",
        hidden: false,
        component: "room/type",
        meta: {
          icon: "user",
          link: null,
          noCache: false,
          title: "客房类型",
          noCache: true,
        },
      },
    ],
    component: "Layout",
    hidden: false,
    name: "Room",
    path: "/room",
    redirect: "noRedirect",
    meta: {
      title: "客房管理",
      noCache: false,
      link: null,
      icon: "system",
      noCache: true,
    },
  },
  {
    path: "/my",
    component: "Layout",
    redirect: "index",
    children: [
      {
        path: "index",
        component: "my/index",
        name: "My",
        meta: { title: "个人信息", icon: "dashboard" },
        noCache: true,
      },
    ],
  },
];

const lastRoute = defaultRoutes[defaultRoutes.length - 1];
defaultRoutes.pop();

let adminRouters = [
  ...defaultRoutes,
  //员工管理路由。根路由。根路由不需要再写meta了。
  //根路由写法如下
  //path指的是URL的匹配。component指的是组件在项目的路径
  {
    path: "/employee",
    component: "Layout",
    redirect: "index",
    children: [
      {
        path: "index",
        component: "employee/index",
        name: "Employee",
        meta: { title: "员工管理", icon: "dashboard" },
        noCache: true,
      },
    ],
  },
  lastRoute,
];
const employeeRouters = [...defaultRoutes, lastRoute];

module.exports = { adminRouters, employeeRouters };
