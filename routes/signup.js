const express = require('express')
const router = express.Router();

const {createNewUser} = require('../controllers/createUser')

router.post('/', createNewUser)

module.exports = router