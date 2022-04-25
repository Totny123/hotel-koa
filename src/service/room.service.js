const connection = require("../app/database");

class RoomService {
  async getRoomList(pageNum, pageSize) {
    const offset = String((pageNum - 1) * pageSize);
    pageSize = String(pageSize);
    const statement = `SELECT * FROM room LIMIT ?,?;`;
    const statement2 = `SELECT * FROM room;`;
    try {
      const [data] = await connection.execute(statement, [offset, pageSize]);
      const [data2] = await connection.execute(statement2);
      return { data, total: data2.length };
    } catch (e) {
      console.log("执行SQL出错！");
    }
  }

  async getType(pageNum = 1, pageSize = 99999) {
    const offset = String((pageNum - 1) * pageSize);
    pageSize = String(pageSize);
    const statement = `SELECT * FROM room_type LIMIT ?,?;`;
    const statement2 = `SELECT * FROM room_type;`;
    try {
      const [data] = await connection.execute(statement, [offset, pageSize]);
      const [data2] = await connection.execute(statement2);
      data.forEach((item) => {
        item.price = item.price.toFixed(2);
      });
      return { data, total: data2.length };
    } catch (e) {
      console.log("执行SQL出错！");
    }
  }

  async delRoomById(id) {
    const statement = `DELETE FROM room WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async addNewRoom(data) {
    const { status, room_number, floor, room_type_id } = data;
    const statement = `INSERT INTO room (status, room_number, floor, room_type_id ) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      status,
      room_number,
      floor,
      room_type_id,
    ]);
    return result;
  }

  async editOldRoom(data) {
    const { id, floor, room_number, room_type_id, status } = data;
    const statement = `UPDATE room SET floor = ?, room_number = ?,room_type_id = ?,status = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      floor,
      room_number,
      room_type_id,
      status,
      id,
    ]);
    return result;
  }

  async addNewType(data) {
    let { name, bed_number, price } = data;
    name = String(name);
    price = parseFloat(price).toFixed(2);
    const statement = `INSERT INTO room_type (name, bed_number, price ) VALUES (?,?,?);`;
    const [result] = await connection.execute(statement, [
      name,
      bed_number,
      price,
    ]);
    return result;
  }

  async delTypeById(id) {
    const statement = `DELETE FROM room_type WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async editOldType(data) {
    let { id, name, bed_number, price } = data;
    price = parseFloat(price).toFixed(2);
    const statement = `UPDATE room_type SET name = ?, bed_number = ?,price = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      name,
      bed_number,
      price,
      id,
    ]);
    return result;
  }
}

module.exports = new RoomService();
