const shortid = require('shortid');
const URL = require('../models/urlSchema');

async function HandelShowAllUrl(req, res){
    if(!req.user) return res.render('login');
    const findAllUrl = await URL.find({ createdBy: req.user._id });
    return res.send(findAllUrl);
}

async function HandelCreatUrl(req, res){
    const {ejsUrl} = req.body;
    const shortId = shortid();

    if(!ejsUrl) return res.status(400).send('put url');
    const uesrIdCheack = req.user._id;
    await URL.create({ redirectUrl: ejsUrl, givenUrl: shortId, createdBy: uesrIdCheack });
    res.render('url', {url: shortId});
};

async function HandelUrlRedirect(req, res){
    const findUrl = await URL.findOneAndUpdate({ givenUrl: req.params.shortID }, {$puch: {visitHistroy: {time:  Date.now()}}});
    return res.redirect(findUrl.redirectUrl);
}

module.exports = {
    HandelCreatUrl,
    HandelUrlRedirect,
    HandelShowAllUrl,
}