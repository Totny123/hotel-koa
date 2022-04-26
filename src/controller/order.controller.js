const { addNewOrder, getOrderList } = require("../service/order.service");

class OrderController {
  async add(ctx, next) {
    try {
      const result = await addNewOrder(ctx.request.body);
      if (result.affectedRows !== 0) {
        ctx.body = {
          code: 200,
          msg: "入住成功",
        };
      } else {
        throw new Error();
      }
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: "入住失败",
      };
    }
  }

  async getList(ctx, next) {
    const { pageNum, pageSize } = ctx.request.query;
    const result = await getOrderList(pageNum, pageSize);
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
}

module.exports = new OrderController();
