const routes = require('express').Router()
const shoppingControllers = require('../controllers/shopping')

routes.post('/', shoppingControllers.createNewShopping)
routes.get('/', shoppingControllers.getAllShopping)
routes.get('/:id', shoppingControllers.getShoppingById)
routes.patch('/:id', shoppingControllers.updateShoppingById)
routes.delete('/:id', shoppingControllers.deleteShoppingById)

module.exports = routes