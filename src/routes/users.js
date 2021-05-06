const routes = require('express').Router()
const userControllers = require('../controllers/user')

routes.get('/', userControllers.GetAllUser)
routes.post('/signup', userControllers.SignUp)
routes.post('/signin', userControllers.SignIn)

module.exports = routes