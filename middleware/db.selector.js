const DB_SELECTOR = 'pg'; //pg sau mysql

let Todo;
if (DB_SELECTOR === 'pg') {
    console.log("pg")
    Todo = require('../config/pg'); // folosim postgres
}
else {
    console.log("--mysql")
    Todo = require('../config/db'); //folosim MySQL
}

module.exports = Todo;