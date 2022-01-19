const express = require('express');
const { sequelize } = require('./models');
const route = require('./routes/route');
const path = require('path');

const app = express();

app.use('/admin', route);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/knjige',(req, res) => {
    res.sendFile('knjige.html', { root: './static' });
});

app.get('/autori',(req, res) => {
    res.sendFile('autori.html', { root: './static' });
});

app.get('/korisnici',(req, res) => {
    res.sendFile('korisnici.html', { root: './static' });
});

app.get('/komentari',(req, res) => {
    res.sendFile('komentari.html', { root: './static' });
});

app.listen({ port:8000}, async () => {
    await sequelize.authenticate();
});