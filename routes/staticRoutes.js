const express = require('express');
const route = express.Router();

route.get('/', (req, res)=>{
    res.render('url');
});

route.get('/singup', (req, res)=>{
    res.render('singup');
});

route.get('/login', (req, res)=>{
    res.render('login');
});


module.exports = route;