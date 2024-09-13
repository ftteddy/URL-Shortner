const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const Connaction = require('./dbConnaction');
const staticRoute = require('./routes/staticRoutes');
const urlRoute  = require('./routes/urlRoutes');
const userRoute  = require('./routes/userRoutes');
const { restrictToLoginUserOnly } = require('./middleware/authMiddleware');

const app = express();
const port = 7000; // PUT YOUR LOCAL SERVER RUNNING PORT 

app.set('view engine', 'ejs'); // SETTING VIEW ENGINE "ejs"
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const url = process.env.MONGODB_DATABASE_LINK; // PUT YOUR MONGODB DATABASE LINK
Connaction(url).then(()=>{console.log('DB is connatad')}).catch((error)=>{console.log('DB error: ', error)});

// ROUTES
app.use('/', staticRoute);
app.use('/url', restrictToLoginUserOnly, urlRoute);
app.use('/user', userRoute);
app.get('/otp', (req, res)=>{
    res.render('otpCheck');
})

app.listen(port, ()=>{ // SERVER IS START AT YOUR GIVEN PORT
    console.log(`Server started at port ${port}`);
})

