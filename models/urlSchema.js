const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    redirectUrl: {type: String, required: true},
    givenUrl: {type: String, required: true},
    visitHistroy: [{time: {}}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

}, {timestamps: true})

const urlModel = mongoose.model('url', urlSchema);
module.exports =  urlModel;