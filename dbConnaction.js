const mongoose = require('mongoose');

async function dbConnat(url){
    return await mongoose.connect(url);
}

module.exports = dbConnat;