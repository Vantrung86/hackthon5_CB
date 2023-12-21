const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_list",
});

//lay
function getTodo() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", (err, rows) => {
      if (err) {
        console.log("11111 loi");
        return;
      }
      resolve(rows);
    });
  });
}
//them
function postTodo(obj) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO todos (name) VALUES (?)`,
      [obj.name],
      (err, rows) => {
        if (err) {
          console.log("11111 loi");
          return;
        }
        resolve(rows);
      }
    );
  });
}
//xoa
function deleteTodo(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM todos WHERE id=?`,[id],
        (err, rows) => {
          if (err) {
            console.log("11111 loi");
            return;
          }
          resolve(rows);
        }
      );
    });
  }

//status
function statusTodo(id,item) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE todos SET status=? WHERE id=?`,[!item.status,id],
      (err, rows) => {
        if (err) {
          console.log("11111 loi");
          return;
        }
        resolve(rows);
      }
    );
  });
}
module.exports = {
  getTodo,
  postTodo,
  deleteTodo,
  statusTodo
};
