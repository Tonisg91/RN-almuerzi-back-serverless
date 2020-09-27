const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mealsRoutes = require('./routes/meals.routes')
const orderRouters = require('./routes/orders.routes')
const userRoutes = require('./routes/auth.routes')
app.use('/api/meals', mealsRoutes)
app.use('/api/orders', orderRouters)
app.use('/api/auth', userRoutes)



module.exports = app