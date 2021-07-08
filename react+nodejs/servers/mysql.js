/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-21 15:20:40
 * @LastEditors: peng
 * @LastEditTime: 2021-06-21 16:17:38
 */
const mySql = require("mysql");
const config = require("./dbconfig");
let options = {
  host: config.config.db_host,
  user: config.config.db_user,
  password: config.config.db_password,
  database: config.config.db_name,
  multipleStatements: true,
};

var pool = mySql.createPool(options);
exports.query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        console.log(err, "数据库连接失败");
        resolve({
          status: 500,
        });
      } else {
        console.log("数据库连接成功");
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
            resolve({
              status: 400,
            });
          } else {
            //**释放连接池 */
            connection.release();
            resolve({
              status: 200,
              results,
            });
          }

          //connection.release()
        });
      }
    });
  });
};
