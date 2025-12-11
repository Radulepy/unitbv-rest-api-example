const mysql = require("mysql2");

const disabled = process.env.DISABLE_DB === '1';

let connection = null;

function ensureConnection() {
  if (disabled) return null;
  if (connection) return connection;

  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "todo_db"
  });

  connection.connect(error => {
    if (error) {
      console.log("Erroare la conectare", error);
    } else {
      console.log("Connectat cu succes mysql");
    }
  });

  return connection;
}

// Export an object to avoid “Cannot set properties of null”
module.exports = {
  ensureConnection,
  connection: ensureConnection()
};