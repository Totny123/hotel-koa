const connection = require("../app/database");

class AdminService {
  async getAdminByUserName(username) {
    const statement = `SELECT * FROM admin WHERE username = ?;`;
    const [result] = await connection.execute(statement, [username]);
    return result[0];
  }
}

module.exports = new AdminService();
