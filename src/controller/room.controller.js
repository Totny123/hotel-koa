const {
  getRoomList,
  getType,
  delRoomById,
  addNewRoom,
  editOldRoom,
  addNewType,
  delTypeById,
  editOldType,
} = require("../service/room.service");

class RoomController {
  async getList(ctx, next) {
    const { pageNum, pageSize } = ctx.request.query;
    const roomList = await getRoomList(pageNum, pageSize);
    let roomType = await getType();
    roomType = roomType.data;
    roomList.data.forEach((item) => {
      if (item.status === 1) {
        item.statusText = "入住中";
      } else if (item.status === 0) {
        item.statusText = "未入住";
      }
      const type = {};
      roomType.forEach((item) => {
        type[item.id] = item.name;
      });
      item["room_type_text"] = type[item["room_type_id"]];
    });
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: roomList.data,
      total: roomList.total,
    };
  }

  async getRoomType(ctx, next) {
    const roomType = await getType();
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: roomType.data,
      total: roomType.total,
    };
  }

  async delRoom(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const result = await delRoomById(id);
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

  async addRoom(ctx, next) {
    const result = await addNewRoom(ctx.request.body);
    if (result.affectedRows !== 0) {
      ctx.body = {
        code: 200,
        msg: "添加成功",
      };
    }
  }

  async editRoom(ctx, next) {
    const result = await editOldRoom(ctx.request.body);
    if (result.affectedRows !== 0) {
      ctx.body = {
        code: 200,
        msg: "编辑成功",
      };
    }
  }

  async addType(ctx, next) {
    const result = await addNewType(ctx.request.body);
    if (result.affectedRows !== 0) {
      ctx.body = {
        code: 200,
        msg: "添加成功",
      };
    }
  }

  async delType(ctx, next) {
    const { id } = ctx.request.body;
    try {
      const result = await delTypeById(id);
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

  async editType(ctx, next) {
    const result = await editOldType(ctx.request.body);
    if (result.affectedRows !== 0) {
      ctx.body = {
        code: 200,
        msg: "编辑成功",
      };
    }
  }
}

module.exports = new RoomController();
