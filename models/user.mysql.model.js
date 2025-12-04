const db = require('../config/db');

const UserMySql = {

    findbyUsername: (username, callback) =>{
        db.query("SELECT * FROM users WHERE username = ? LIMIT 1;", [username], (err, results)=>{
            if(err) return callback(err);
            callback(null, results[0] || null )
        })
    },

    create:(username, passwordHash, callback) => {
        db.query("INSERT INTO users (username, password_has) VALUES (?,?);", [username, passwordHash], (err, result)=>{
            if(err) callback(err);
            callback(null, {id: result.insertId}); // todo: hashed ID not integer ID
        })
    }
}

module.exports = UserMySql;