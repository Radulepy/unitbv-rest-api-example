
exports.getTodo = (req, res) => {
    const Todo = req.Todo || require("../models/todo.mysql.model");
    Todo.getAll((err, results) => {
        if (err)
            return res.status(500).json({ error: err?.message || err });
        res.json(results);
    })
}

exports.createTodo = (req, res) => {
    const Todo = req.Todo || require("../models/todo.mysql.model");
    const { title } = req.body;
    if (!title)
        return res.status(400).json({ error: "Titlul lipsa" });

    Todo.create(title, (error, result) => {
        if (error) {
            console.log("--err", error);
            return res.status(500).json({ error: error?.message || error });
        }
        return res.status(201).json({ id: result?.insertId ?? result?.insertedId, title, completed: false });
    })
}

exports.deleteTodo = (req, res) => {
    const Todo = req.Todo || require("../models/todo.mysql.model");
    const { id } = req.params;

    Todo.delete(id, (err) => {
        if (err)
            return res.status(500).json({ error: err?.message || err });
        res.json({ message: "Todo Deleted" });
    })
}