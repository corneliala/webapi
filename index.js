const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000
const express = require('express')
const initMongoDB = require('./mongodb_server')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json())

// routes/controllers
const productsController = require('./controllers/productsController')
app.use('/api/products', productsController)
const usersController = require('./controllers/usersController')
app.use('/api/users', usersController)


initMongoDB()
app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))