const {getUser} = require('../service/auth');

async function restrictToLoginUserOnly(req, res, next){

    const userSessionId = req.cookies.uid;
    if(!userSessionId) return res.redirect('/login');
    const getUserId = await getUser(userSessionId);
    if(!getUserId) return res.redirect('/login');

    req.user = getUserId;
    next();
}

async function checkAuth(req, res, next){
    const userSessionId = req.cookies.uid;
    const getUserId = await getUser(userSessionId);
    req.user = getUserId;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
    checkAuth,
}