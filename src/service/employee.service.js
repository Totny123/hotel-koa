const connection = require("../app/database");

class EmployeeService {
  async getEmployeeByUserName(username) {
    const statement = `SELECT * FROM employee WHERE username = ?;`;
    const [result] = await connection.execute(statement, [username]);
    return result[0];
  }
}

module.exports = new EmployeeService();
