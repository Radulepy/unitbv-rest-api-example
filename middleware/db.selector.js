const DB_SELECTOR = 'pg'; //pg sau mysql

let Todo;
if (DB_SELECTOR === 'pg') {
    Todo = require('../config/pg'); // folosim postgres
}
else {
    Todo = require('../config/db'); //folosim MySQL
}

module.exports = Todo;