const shoppingModel = require('../models/shopping')

exports.createNewShopping = (req, res) => {
    const data = req.body
    shoppingModel.createShopping(data, (results) => {
        if (results.affectedRows > 0) {
            shoppingModel.getShoppingById(results.insertId, (finalResult) => {
                if (finalResult.length > 0) {
                    return res.status(201).json({
                        message: 'Details of Shopping',
                        results: finalResult[0]
                    })
                }
                return res.status(400).json({
                    message: 'Failed to create shopping'
                })
            })
        }
    })
}


exports.getAllShopping = (req, res) => {
    shoppingModel.getAllShopping((results) => {
        return res.json({
            message: 'List of shopping',
            results
        })
    })
}

exports.getShoppingById = (req, res) => {
    const id = req.params.id
    shoppingModel.getShoppingById(id, (results) => {
        if (results.length > 0) {
            return res.json({
                message: 'Detail of shopping',
                results: results[0]
            })
        }
        else {
            return res.status(404).json({
                message: 'Failed to get detail of shopping'
            })
        }
    })
}

exports.deleteShoppingById = (req, res) => {
    const id = req.params.id
    shoppingModel.deleteShopping(id, (results) => {
        if (results.affectedRows > 0) {
            return res.json({
                message: 'Shopping data deleted successfully',
            })
        }
        return res.status(404).json({
            message: 'Failed to delete Shopping data'
        })
    })
}

exports.updateShoppingById = (req, res) => {
    const { id } = req.params
    const data = req.body
    shoppingModel.getShoppingById(id, initialResult => {
        if (initialResult.length > 0) {
            shoppingModel.updateShopping(id, data, results => {
                return res.json({
                    message: 'Update shopping success',
                    results: {
                        ...initialResult[0],
                        ...data
                    }
                })
            })
        } else {
            return res.status(404).json({
                message: 'Failed to update Shopping'
            })
        }
    })
}