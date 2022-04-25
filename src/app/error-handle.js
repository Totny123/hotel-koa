const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_WRONG:
      message = { code: "400", msg: "用户名或者密码错误" };
      break;
    case errorTypes.UNAUTHORIZATION:
      message = { code: 401 };
      break;
    default:
      message = "NOT FOUND";
  }

  ctx.status = 200;
  ctx.body = message;
};

module.exports = errorHandler;
