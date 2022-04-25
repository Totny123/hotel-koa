const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  getList,
  del,
  add,
  edit,
  getInfoByName,
} = require("../controller/employee.controller");

const employeeRouter = new Router({ prefix: "/employee" });

employeeRouter.get("/list", verifyAuth, getList);
employeeRouter.post("/del", verifyAuth, del);
employeeRouter.post("/add", verifyAuth, add);
employeeRouter.post("/edit", verifyAuth, edit);
employeeRouter.get("/info", verifyAuth, getInfoByName);

module.exports = employeeRouter;
