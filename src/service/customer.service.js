const connection = require("../app/database");

class CustomerService {
  async getCustomerList(pageNum = 1, pageSize = 99999) {
    const offset = String((pageNum - 1) * pageSize);
    pageSize = String(pageSize);
    const statement = `SELECT * FROM customer LIMIT ?,?;`;
    const statement2 = `SELECT * FROM customer;`;
    try {
      const [data] = await connection.execute(statement, [offset, pageSize]);
      const [data2] = await connection.execute(statement2);
      return { data, total: data2.length };
    } catch (e) {
      console.log("执行SQL出错！");
    }
  }

  async delById(id) {
    const statement = `DELETE FROM customer WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async addNewCustomer(data) {
    let { fullname, sex, age, card_id, phone_number, role_id = 3 } = data;
    const statement = `INSERT INTO customer (fullname,sex,age,card_id,phone_number,role_id) VALUES (?,?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      role_id,
    ]);
    return result;
  }

  async editOldCustomer(data) {
    let { id, fullname, sex, age, card_id, phone_number } = data;
    const statement = `UPDATE customer SET fullname = ?,sex = ?,age = ?,card_id = ?,phone_number = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      id,
    ]);
    return result;
  }
}

module.exports = new CustomerService();
