const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
const adminService = require("../service/admin.service");
const employeeService = require("../service/employee.service");
const {
  adminRouters,
  employeeRouters,
} = require("../constants/front-end-routers");

class AuthController {
  async login(ctx, next) {
    const { id, username, role_id } = ctx.user;
    const token = jwt.sign({ id, username, role_id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      // expiresIn: 5,
      algorithm: "RS256",
    });
    ctx.body = { code: 200, msg: "操作成功", token };
  }

  async getInfo(ctx, next) {
    const { id, username, role_id } = ctx.user;
    if (role_id === 1) {
      const user = await adminService.getAdminByUserName(username);
      delete user.password;
      ctx.body = {
        code: 200,
        msg: "操作成功",
        permissions: ["*:*:*"],
        roles: ["admin"],
        user,
      };
    } else if (role_id === 2) {
      const user = await employeeService.getEmployeeByUserName(username);
      delete user.password;
      ctx.body = {
        code: 200,
        msg: "操作成功",
        permissions: ["*:*:*"],
        roles: ["employee"],
        user,
      };
    }
  }

  async getRouters(ctx, next) {
    const { id, username, role_id } = ctx.user;
    let data;
    if (role_id === 1) {
      data = adminRouters;
    } else if (role_id === 2) {
      data = employeeRouters;
    }
    ctx.body = {
      code: 200,
      data,
      msg: "操作成功",
    };
  }
}

module.exports = new AuthController();
