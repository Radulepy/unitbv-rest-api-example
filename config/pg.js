const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin', // ''
    database: "todo_db",
    port: 5432,
    ssl: undefined // pt cloud (optional)
});

pool.on('error', (error) => {
    console.log("eroare la conectare", error);
})

module.exports = pool;