const express = require('express');
const { getAllUserUrl } = require('../controllers/shortUrl');
const router = express.Router();

router.get('/', getAllUserUrl)

module.exports = router