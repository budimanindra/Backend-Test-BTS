const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.GetAllUser = async (req, res) => {
    const getAllUser = await userModel.getAllUser()
    if (getAllUser.length > 0) {
        return res.json({
            message: 'List of all users',
            getAllUser
        })
    }
    return res.json({
        message: 'Currently there are no users'
    })
}

exports.SignIn = async (req, res) => {
    const { email, password } = req.body
    const existingUser = await userModel.getUsersByConditionAsync({ email })
    if (existingUser.length > 0) {
        const compare = await bcrypt.compare(password, existingUser[0].password)
        if (compare) {
            const { id } = existingUser[0]
            const token = jwt.sign({ id }, APP_KEY)
            return res.json({
                email: email,
                token,
                username:existingUser[0].username,
            })
        }
    }
    return res.status(401).json({
        message: 'Wrong email or password'
    })
}

exports.SignUp = async (req, res) => {
    const { username, email, password, phone, address, city, country, name, postcode } = req.body
    const isExists = await userModel.getUsersByConditionAsync({ email, username, phone })
    if (isExists.length < 1) {
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(password, salt)
        const createUser = await userModel.createUserAsync({ username, email, password: encryptedPassword, phone, address, city, country, name, postcode })
        if (createUser.insertId > 0) {
            const { insertId } = createUser
            const id = insertId
            const token = jwt.sign({ id }, APP_KEY)
            return res.json({
                username: username,
                email: email,
                encrypted_password: 123456,
                phone: phone,
                address: address,
                city: city,
                country: country,
                name: name,
                postcode: postcode,
                username: username,
                token: token
            })
        } else {
            return res.status(400).json({
                message: 'Register Failed'
            })
        }
    } else {
        return res.status(400).json({
            message: 'Email, username or phone already exists'
        })
    }
}