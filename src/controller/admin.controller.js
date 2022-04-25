const {
  getAdminByUserName,
  editOldAdmin,
} = require("../service/admin.service");

class AdminController {
  async getInfoByName(ctx, next) {
    const result = await getAdminByUserName(ctx.request.query.username);
    delete result.password;
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: result,
    };
  }
  async edit(ctx, next) {
    try {
      const result = await editOldAdmin(ctx.request.body);
      if (result.affectedRows !== 0) {
        ctx.body = {
          code: 200,
          msg: "编辑成功",
        };
      }
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: "编辑失败",
      };
    }
  }
}

module.exports = new AdminController();
