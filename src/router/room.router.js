const Router = require("koa-router");

const roomRouter = new Router({ prefix: "/room" });

const { verifyAuth } = require("../middleware/auth.middleware");
const {
  getList,
  getRoomType,
  delRoom,
  addRoom,
  editRoom,
  addType,
  delType,
  editType,
} = require("../controller/room.controller");

roomRouter.get("/list", verifyAuth, getList);
roomRouter.get("/type", verifyAuth, getRoomType);
roomRouter.post("/del", verifyAuth, delRoom);
roomRouter.post("/add", verifyAuth, addRoom);
roomRouter.post("/edit", verifyAuth, editRoom);
roomRouter.post("/addType", verifyAuth, addType);
roomRouter.post("/delType", verifyAuth, delType);
roomRouter.post("/editType", verifyAuth, editType);

module.exports = roomRouter;
