const express = require('express')
const router = express.Router();

const {generateNewShortUrl, redirectToLongUrl, getAllUserUrl} = require('../controllers/shortUrl')

router.post('/', generateNewShortUrl)

router.get('/:shortId', redirectToLongUrl)

module.exports = router