const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const AdminRouter = new Router({ prefix: "/admin" });

const { getInfoByName, edit } = require("../controller/admin.controller");

AdminRouter.get("/info", verifyAuth, getInfoByName);
AdminRouter.post("/edit", verifyAuth, edit);

module.exports = AdminRouter;
