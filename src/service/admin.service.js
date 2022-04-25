const connection = require("../app/database");
const md5password = require("../utils/password-handle");

class AdminService {
  async getAdminByUserName(username) {
    const statement = `SELECT * FROM admin WHERE username = ?;`;
    const [result] = await connection.execute(statement, [username]);
    return result[0];
  }

  async editOldAdmin(data) {
    let { id, username, password, nickname } = data;
    const statement = `UPDATE admin SET username = ?, password = ?,nickname = ? WHERE id = ?;`;
    try {
      const [result] = await connection.execute(statement, [
        username,
        md5password(password),
        nickname,
        id,
      ]);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AdminService();
