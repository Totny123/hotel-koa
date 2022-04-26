const connection = require("../app/database");

class OrderService {
  async addNewOrder(data) {
    let {
      room_id,
      customer_id_list,
      check_in_time,
      check_out_time,
      total_price,
    } = data;
    const statement = `INSERT INTO order_list (room_id,customer_id_list,check_in_time,check_out_time,total_price) VALUES (?,?,?,?,?);`;
    try {
      const [result] = await connection.execute(statement, [
        room_id,
        customer_id_list.join(","),
        new Date(check_in_time),
        new Date(check_out_time),
        total_price,
      ]);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderList(pageNum = 1, pageSize = 9999) {
    const offset = String((pageNum - 1) * pageSize);
    pageSize = String(pageSize);
    const statement = `SELECT * FROM order_list LIMIT ?,?;`;
    const statement2 = `SELECT * FROM order_list;`;
    try {
      const [data] = await connection.execute(statement, [offset, pageSize]);
      const [data2] = await connection.execute(statement2);
      return { data, total: data2.length };
    } catch (e) {
      console.log("执行SQL出错！");
    }
  }
}

module.exports = new OrderService();
