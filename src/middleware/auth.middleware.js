const jwt = require("jsonwebtoken");

const errorTypes = require("../constants/error-types");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

const adminService = require("../service/admin.service");
const employeeService = require("../service/employee.service");

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const { username, password, role_id } = ctx.request.body;
  //根据用户名和角色查询对应数据
  let user;
  if (role_id === 1) {
    user = await adminService.getAdminByUserName(username);
  } else if (role_id === 2) {
    user = await employeeService.getEmployeeByUserName(username);
  }
  // 判断密码是否和数据库中的密码是一致(加密)
  if (md5password(password) !== user?.password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_WRONG);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
