const express = require('express');
const { sequelize, korisnici } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {

    const obj = {
        IME: req.body.name,
        EMAIL: req.body.email,
        ADMIN: req.body.admin,
        PASSWORD: bcrypt.hashSync(req.body.password, 10)
    };
    korisnici.create(obj).then( rows => {
        const usr = {
            userId: rows.ID,
            user: rows.IME
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    korisnici.findOne({ where: { IME: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.PASSWORD)) {
                const obj = {
                    userId: usr.ID,
                    user: usr.IME
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json({ msg: "Invalid credentials"}) );
        
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});