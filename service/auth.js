const jwt = require('jsonwebtoken');
const JWTKEY = 'VIVEK1234@1234';

function setUser(user){
    if(!user) return null;
    return jwt.sign({ _id: user._id, email: user.email, }, JWTKEY);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, JWTKEY);
}

module.exports = {
    setUser,
    getUser,
}