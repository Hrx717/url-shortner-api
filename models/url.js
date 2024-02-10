const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema ({
    createdBy: {
        type: String,
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
    },
    visitHistory: [ {timeStamp: Number} ]
})

const Url = mongoose.model("url", urlSchema)

module.exports = Url