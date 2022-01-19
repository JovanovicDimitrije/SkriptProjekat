const { sequelize, korisnici, knjige, komentari, autori } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


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

    korisnici.findAll()
        .then( rows => res.json(rows) )
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
    console.log(req.body);
    korisnici.create({ IME: req.body.IME, EMAIL: req.body.EMAIL, PASSWORD: req.body.PASSWORD })
        .then( rows => res.json(rows) )
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

    korisnici.findOne({ where: { ID: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;