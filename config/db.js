const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_db"
})

connection.connect(error => {
    if(error)
    {
        console.log("Erroare la conectare", error);
    }
    else
    {
        console.log("Connectat cu succes");
    }
});

module.exports = connection;