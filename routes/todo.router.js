const express = require("express");
const router = express.Router();
const dbSelector = require("../middleware/db.selector");
const todoController = require("../controllers/todo.controller");
// Attach DB-selection middleware to all todo routes
router.use(dbSelector);


router.get("/todos", todoController.getTodo);
router.post("/todos", todoController.createTodo);
router.delete("/todos/:id", todoController.deleteTodo)

module.exports = router;



