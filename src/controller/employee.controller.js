const {
  getEmployeeList,
  delById,
  addNewEmployee,
  editOldEmployee,
  getEmployeeByUserName,
} = require("../service/employee.service");

class EmployeeController {
  async getList(ctx, next) {
    const { pageNum, pageSize } = ctx.request.query;
    const result = await getEmployeeList(pageNum, pageSize);
    result.data.forEach((item) => {
      delete item.password;
    });
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: result.data,
      total: result.total,
    };
  }

  async del(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const result = await delById(id);
      if (result.affectedRows === 0) {
        throw new Error();
      }
      ctx.body = {
        code: 200,
        msg: "删除成功",
      };
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: "删除失败",
      };
    }
  }

  async add(ctx, next) {
    try {
      const result = await addNewEmployee(ctx.request.body);
      if (result.affectedRows !== 0) {
        ctx.body = {
          code: 200,
          msg: "添加成功",
        };
      } else {
        throw new Error();
      }
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: "添加失败",
      };
    }
  }

  async edit(ctx, next) {
    try {
      const result = await editOldEmployee(ctx.request.body);
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

  async getInfoByName(ctx, next) {
    const { username } = ctx.request.query;
    const result = await getEmployeeByUserName(username);
    delete result.password;
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: result,
    };
  }
}

module.exports = new EmployeeController();
