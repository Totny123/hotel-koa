const Router = require("koa-router");

const authRouter = new Router();

const { login, getInfo, getRouters } = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

authRouter.post("/login", verifyLogin, login);
authRouter.get("/getInfo", verifyAuth, getInfo);
authRouter.get("/getRouters", verifyAuth, getRouters);

module.exports = authRouter;
