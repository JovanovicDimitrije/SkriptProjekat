const { sequelize, korisnici, knjige, komentari, autori } = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
        next();
    });
}

route.use(authToken);

route.get('/autori', (req, res) => {

    autori.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/knjige', (req, res) => {

    knjige.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/komentari', (req, res) => {

    komentari.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/korisnici', (req, res) => {
    console.log(req.user);
    korisnici.findOne({ where: { ID: req.user.userId } })
    .then( usr => {
        console.log(usr);
        if (usr.ADMIN) {
            korisnici.findAll()
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
        } else {
            res.status(403).json({ msg: "User is not admin!"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
    
});

route.post('/dodajautora', (req, res) => {
    
    autori.create({ AUTOR: req.body.AUTOR })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/dodajknjigu', (req, res) => {
    
    knjige.create({ IME: req.body.IME, ID_AUTOR: req.body.ID_AUTOR })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/dodajkomentar', (req, res) => {
    
    komentari.create({ ID_KNJIGA: req.body.ID_KNJIGA, ID_KORISNIK: req.body.ID_KORISNIK, KOMENTAR: req.body.KOMENTAR })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/dodajkorisnika', (req, res) => {
    korisnici.findOne({ where: { ID: req.user.userId } })
        .then( usr => {
            if (usr.ADMIN) {
                korisnici.create({ IME: req.body.IME, EMAIL: req.body.EMAIL, PASSWORD: bcrypt.hashSync(req.body.PASSWORD, 10), ADMIN: req.body.ADMIN })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({ msg: "User already exists!"}) );
            } else {
                res.status(403).json({ msg: "User is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/autori/:id', (req, res) => {
    
    autori.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.AUTOR = req.body.AUTOR;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.put('/knjige/:id', (req, res) => {
    
    knjige.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.IME = req.body.IME;
            usr.ID_AUTOR = req.body.ID_AUTOR;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.put('/komentari/:id', (req, res) => {
    
    komentari.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.ID_KNIGA = req.body.ID_KNIGA;
            usr.ID_KORISNIK = req.body.ID_KORISNIK;
            usr.KOMENTAR = req.body.KOMENTAR;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.put('/korisnici/:id', (req, res) => {
    
    korisnici.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.IME = req.body.IME;
            usr.EMAIL = req.body.EMAIL;
            usr.PASSWORD = req.body.PASSWORD;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/autori/:id', (req, res) => {

    autori.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/knjige/:id', (req, res) => {
    knjige.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/komentari/:id', (req, res) => {

    komentari.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/korisnici/:id', (req, res) => {
    korisnici.findOne({ where: { ID: req.user.userId } })
        .then( usr => {
            if (usr.ADMIN) {
                korisnici.findOne({ where: { ID: req.params.id } })
                 .then( usr => {
                    usr.destroy()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "User is not admin!"});
            }
        })
        .catch( err => res.status(500).json(err) );
    
});

module.exports = route;