const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  getList,
  // del,
  add,
  // edit,
  // getInfoByName,
} = require("../controller/order.controller");

const orderRouter = new Router({ prefix: "/order" });

orderRouter.get("/list", verifyAuth, getList);
// orderRouter.post("/del", verifyAuth, del);
orderRouter.post("/add", verifyAuth, add);
// orderRouter.post("/edit", verifyAuth, edit);
// orderRouter.get("/info", verifyAuth, getInfoByName);

module.exports = orderRouter;
