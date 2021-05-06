const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const {APP_PORT} = process.env
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors('*'))
app.use(morgan('dev'))

app.use('/api/users', require('./src/routes/users'))
app.use('/api/shopping', require('./src/routes/shopping'))

app.get('/', (request, response) => {
    return response.json({
      success: true,
      message: 'Backend is running well'
    })
  })

app.listen(APP_PORT, ()=> {
    console.log(`App is running in port ${APP_PORT}`)
})