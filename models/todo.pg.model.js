const pool = require('../config/pg');

const TodoPg = {
    getAll: (callback) => {
        pool.query("SELECT * FROM todos", (err, result) => {
            if (err) return callback(err);
            callback(null, result.rows);
        })
    },

    create: (title, callback) => {
        pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING id", [title],
            (err, result) => {
                if (err)
                    return callback(err);
                const id = result.rows?.[0]?.id;
                callback(null, { insetedId: id });
            })
    },

    delete: (id, callback) => {
        pool.query("DELETE FROM todos WHERE id = $1", [id], (err, result) => {
            callback(err, result);
        })
    }
}

module.exports = TodoPg;