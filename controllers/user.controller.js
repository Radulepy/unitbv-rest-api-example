const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/user.mysql.model");
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRATION = process.env.JWT_EXPIRES_IN || '1h';

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "username and password required" });
    }

    User.findByUsername(username, (err, existing) => {
        if (err) return res.status(500).json({ error: err?.message || err });
        if (existing) return res.status(409).json({ error: "username already exists" });

        bcrypt.hash(password, 10, (hashErr, hash) => {
            if (hashErr) return res.status(500).json({ error: hashErr?.message || hashErr });
            User.create(username, hash, (createError, created) => {
                if (createError)
                    return res.status(500).json({ error: createError?.message || createError });

                return res.status(201).json({ id: created.id, username });
            })
        })

    })
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "username and password required" })
    }
    
    User.findByUsername(username, (err, user)=>{
        if(err) return res.status(500).json({error: err?.message || err})
        if(!user) return res.status(401).json({error: "invalid credentials"});
        
        bcrypt.compare(password, user.password_hash, (cryptError, match)=>{
            if(cryptError) return res.status(500).json({error: cryptError?.message || cryptError});
            
            if(!match) return res.status(401).json({error: "invalid credentials"})
            const payload = {sub: user.id, username: user.username};
            
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
            return res.json({token});
        })
    })
}