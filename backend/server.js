require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const exerciseRoutes = require('./routes/exercise')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

const app = express()

// Middleware
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://workouttracker.onrender.com']
    })
)
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

// Routes
app.use('/api/exercise', exerciseRoutes)
app.use('/api/workout', workoutRoutes)
app.use('/api/user', userRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Server
        app.listen(process.env.PORT, () => {
            console.log(`Listening on ${process.env.PORT}...`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
