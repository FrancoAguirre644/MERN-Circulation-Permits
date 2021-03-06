require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const profileRouter = require('./routes/profileRouter')
const userRouter = require('./routes/userRouter')
const siteRouter = require('./routes/siteRouter')
const personRouter = require('./routes/personRouter')
const vehicleRouter = require('./routes/vehicleRouter')
const dailyPermitRouter = require('./routes/dailyPermitRouter')
const periodPermitRouter = require('./routes/periodPermitRouter')

const app = express()
app.use(express.json())
app.use(cors())

// Routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/profiles', profileRouter)
app.use('/api/v1/sites', siteRouter)
app.use('/api/v1/persons', personRouter)
app.use('/api/v1/vehicles', vehicleRouter)
app.use('/api/v1/dailyPermits', dailyPermitRouter)
app.use('/api/v1/periodPermits', periodPermitRouter)

// Listen Server

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

// Connect to MongoDb

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})