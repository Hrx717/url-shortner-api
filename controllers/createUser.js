const User = require('../models/user')

const createNewUser = async (req, res) => {
    const {name, email, password } = req.body

    try {
        const newUser = await User.create({
            name, email, password
        })
        return res.status(200).json({message: 'User created', newUser})
    }
    catch {
        return res.status(400).json({message: "Email Already Existed"})
    }
    
}

module.exports = {createNewUser}