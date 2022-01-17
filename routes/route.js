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

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/users', (req, res) => {
    
    Users.create({ name: req.body.name, email: req.body.email })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.name = req.body.name;
            usr.email = req.body.email;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/messages', (req, res) => {

    Messages.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/messages/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/messages', (req, res) => {

    Messages.create({ body: req.body.body, userId: req.body.userId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/messages/:id', (req, res) => {
    
    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.body = req.body.body;

            msg.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/messages/:id', (req, res) => {

    Messages.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( msg => {
            msg.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;