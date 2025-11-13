const express = require("express");
const router = express.Router();
// const todoController = require("../controllers/todo.controller");
const todoController = require("../controllers/todo.pg.controller");

router.get("/todos", todoController.getTodo);
router.post("/todos", todoController.createTodo);
router.delete("/todos/:id", todoController.deleteTodo)

module.exports = router;



