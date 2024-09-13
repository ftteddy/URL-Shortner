// const {v4: uuidv4} = require('uuid') // NO NEED OF YOU 'jwt in useg'
const bcrypt = require('bcrypt'); 
const userModel = require('../models/userSchema');
const {setUser} = require('../service/auth');
const OtpMailSender = require('../service/optMailSender')

const otpR = Math.random();
const otpGenrate = Math.round(otpR*9000+1000);
const mostOtp = otpGenrate;
console.log(otpGenrate, mostOtp);

async function HandelSingup(req, res){
    const saltRounds = 10;
    const {name, email, password} = req.body;
    if(!name || !email || !password) return res.render('singup');

    // PASSWORD HASING!
    bcrypt.genSalt(saltRounds, async(error, salt)=>{
        bcrypt.hash(password, salt, async(error, hash)=>{
            await userModel.create({name, email, password: hash});
        })
    });
    res.render('login');
}

async function HandelLogin(req, res){
    const {email, password} = req.body; 
    const userEmail = await userModel.findOne({email});
    
    if(!userEmail) return res.render('login');;

    const matchPassword = await bcrypt.compare(password, userEmail.password); // MATCHING USER GIVEN PASSWORD WITH DB HASH PASSWORD!

    if(matchPassword){
        OtpMailSender(email, otpGenrate); // SENDEING OTP VIA EMAIL

        const token = setUser(userEmail);
        res.cookie('uid', token);
        return res.render('otpCheck');
    } else{
        return res.render('login');
    }
}

async function HandelOtpReq(req, res){
    const {otpSubmit} = req.body;
    if(!otpSubmit) return res. render('otpCheck');

    if(otpSubmit==mostOtp){
        return res.redirect('/');
    } else{
        return res.render('otpCheck');
    }

}

module.exports = {
    HandelSingup,
    HandelLogin,
    HandelOtpReq,
}