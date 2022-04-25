const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  getList,
  del,
  add,
  edit,
} = require("../controller/customer.controller");

const customerRouter = new Router({ prefix: "/customer" });

customerRouter.get("/list", verifyAuth, getList);
customerRouter.post("/del", verifyAuth, del);
customerRouter.post("/add", verifyAuth, add);
customerRouter.post("/edit", verifyAuth, edit);

module.exports = customerRouter;
