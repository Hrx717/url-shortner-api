const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const dotenv = require('dotenv').config()

const urlRoute = require('./routes/url')
const loginRoute = require('./routes/login')
const signUpRoute = require('./routes/signup')
const dashboardRoute = require('./routes/dashboard')

const PORT = process.env.PORT || 8001
const app = express();

app.use(express.json())
app.use(cors())

//mogoose connection
const connectToMongoDB = async (url) => {
    return await mongoose.connect(url)
}

connectToMongoDB(process.env.DATABASE)
.then(() => console.log('DB connection successful'))
.catch(() => console.log('DB connection Failed'))

app.use('/url', urlRoute)

app.use('/', urlRoute)

app.use('/user/dashboard',dashboardRoute)

app.use('/auth/login', loginRoute)

app.use('/auth/signup', signUpRoute)


app.listen(PORT,() => console.log(`listening on port ${PORT}`))