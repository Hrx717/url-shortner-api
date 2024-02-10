var { nanoid } = require("nanoid");
const Url = require('../models/url')

const generateNewShortUrl = async (req, res) => {
    const body = req.body
    if(!body || !body.longUrl || !body.userId)
    return res.status(400).json({error: "Url not received or email not found"})

    const allUrls = await Url.find({createdBy: body.userId})
    if(!allUrls || allUrls.length===0) {
        const newShortId = nanoid(8)
        await Url.create({createdBy: body.userId, shortId: newShortId, redirectUrl: body.longUrl, visitHistory: []})
        return res.status(200).json({message: 'added', urlId: newShortId})
    }

    for(let i=0; i<allUrls.length; i++) {
        if(body.longUrl === allUrls[i].redirectUrl) {
            return res.status(200).json({message: 'added', urlId: allUrls[i].shortId})
        }
    }

    const newShortId = nanoid(8)
    await Url.create({createdBy: body.userId, shortId: newShortId, redirectUrl: body.longUrl, visitHistory: []})
    return res.status(200).json({message: 'added', urlId: newShortId})
}

const redirectToLongUrl = async (req, res) => {
    const shortId = req.params.shortId
    if(!shortId)
    return res.status(400).json({message: "shortUrl not recieved"})

    const myUrls = await Url.findOne({shortId})
    if(!myUrls)
    res.status(400).json({message: "No Url found from given url"})

    await Url.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamp: Date.now()}}})
    res.redirect(myUrls?.redirectUrl)
}

const getAllUserUrl = async (req,res) => {
    const {userid} = req.headers
    // console.log(userid)
    if(!userid)
    return res.status(400).json({error: "Invalid User/No url found for current user"})

    const myUrls = await Url.find({createdBy: userid})

    if(!myUrls)
    return res.status(400).json({error: "No url found for current user"})

    return res.status(200).json({myUrls})
}

module.exports = {generateNewShortUrl, redirectToLongUrl, getAllUserUrl}