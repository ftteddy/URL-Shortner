const express = require('express');
const route = express.Router();

const { HandelSingup, HandelLogin, HandelOtpReq } = require('../controllers/userController');

route.post('/singup', HandelSingup);
route.post('/login', HandelLogin);
route.post('/otp', HandelOtpReq);

module.exports = route;