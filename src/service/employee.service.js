const connection = require("../app/database");
const md5password = require("../utils/password-handle");

class EmployeeService {
  async getEmployeeByUserName(username) {
    const statement = `SELECT * FROM employee WHERE username = ?;`;
    const [result] = await connection.execute(statement, [username]);
    return result[0];
  }

  async getEmployeeList(pageNum, pageSize) {
    const offset = String((pageNum - 1) * pageSize);
    pageSize = String(pageSize);
    const statement = `SELECT * FROM employee LIMIT ?,?;`;
    const statement2 = `SELECT * FROM employee;`;
    try {
      const [data] = await connection.execute(statement, [offset, pageSize]);
      const [data2] = await connection.execute(statement2);
      return { data, total: data2.length };
    } catch (e) {
      console.log("执行SQL出错！");
    }
  }

  async delById(id) {
    const statement = `DELETE FROM employee WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async addNewEmployee(data) {
    let {
      username,
      password,
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      entry_time,
      role_id = 2,
    } = data;
    const statement = `INSERT INTO employee (username,password,fullname,sex,age,card_id,phone_number,entry_time,role_id) VALUES (?,?,?,?,?,?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      username,
      md5password(password),
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      new Date(entry_time),
      role_id,
    ]);
    return result;
  }

  async editOldEmployee(data) {
    let {
      id,
      username,
      password,
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      entry_time,
    } = data;
    const statement = `UPDATE employee SET username = ?, password = ?,fullname = ?,sex = ?,age = ?,card_id = ?,phone_number = ?,entry_time  = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [
      username,
      md5password(password),
      fullname,
      sex,
      age,
      card_id,
      phone_number,
      new Date(entry_time),
      id,
    ]);
    return result;
  }
}

module.exports = new EmployeeService();
