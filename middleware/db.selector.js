// Database selector "middleware": attaches the chosen Todo model to req
// Set DB_SELECTOR to 'pg' or 'mysql'
const DB_SELECTOR = 'pg'; // 'pg' sau 'mysql'

let TodoModel;
if (DB_SELECTOR === 'pg') {
    // Use the Postgres model implementation
    TodoModel = require('../models/todo.pg.model');
} else {
    // Use the MySQL model implementation
    TodoModel = require('../models/todo.mysql.model');
}

module.exports = function dbSelector(req, res, next) {
    req.Todo = TodoModel;
    next();
};