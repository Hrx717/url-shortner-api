const User = require('../models/user')

const loginUser = async (req, res) => {
    const body = req.body
    if(!body || !body.email || !body.password)
    return res.status(400).json({error: "Email/Password not received"})

    const user = await User.findOne({email: body.email, password: body.password})

    if(!user)
    return res.status(400).json({message: "Email not registered"})

    return res.status(200).json({message: "Login Successful", user})
}

module.exports = {loginUser}