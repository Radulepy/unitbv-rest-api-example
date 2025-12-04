const jwt = require('jsonwebtoken');
const bycrypt = require('bycrypt');
const User = require("../models/user.mysql.model");
const JWT_SECRET = process.env.JWT_SECRET || '677da87c88e35256d8021ab7abccdd13af7cf87acfc78760423573346f7c7ee8';
const JWT_EXPIRATION = '1h';

exports.register = (req, res) => {
    const { username, pass } = req.body;
    if (!username || !pass) {
        return res.status(400).json({ error: "usn & pass req" })
    }

    User.findbyUsername(username, (err, existing) => {
        if (err) return res.status(500).json({ error: err });
        if (existing) return res.status(409).json({ error: "username already exists" })

        bycrypt.hash(pass, 10, (hashErr, hash) => {
            if (hashErr) res.status(500).json({ error: "bycrypt err" })
            User.create(username, hash, (createError, created) => {
                if (createError)
                    return res.status(500).json({ error: createError });

                return res.status(201).json({ id: created.create_id });
            })
        })

    })
}

exports.login = (req, res) => {
    const { username, pass } = req.body;
    if (!username || !pass) {
        return res.status(400).json({ error: "usn & pass req" })
    }
    
    User.findbyUsername(username, (err, user)=>{
        if(err) return res.status(500).json({error: err})
        
        bycrypt.compare(pass, user.pass, (cryptError, match)=>{
            if(cryptError) return res.status(500).json({error: cryptError});
            
            if(!match) return res.status(401).json({error: "pass does not match"})
            const payload = {sub: user.id, username: user.username};
            
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
             res.json({token})
        })
    })
}