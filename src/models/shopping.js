const db = require('../helpers/db')

exports.getAllShopping = (cb) => {
    const query = db.query(`
    SELECT * FROM shopping
  `, (err, res, field) => {
        if (err) throw err
        cb(res)
    })
    console.log(query.sql)
}

exports.getShoppingById = (id, cb) => {
    const query = db.query(`
    SELECT * FROM shopping WHERE id=${id}
  `, (err, res, field) => {
        if (err) throw err
        cb(res)
    })
}

exports.createShopping = (data = {}, cb) => {
    const query = db.query(`
  INSERT INTO shopping
  (${Object.keys(data).join()})
  VALUES
  (${Object.values(data).map(item => `"${item}"`).join(',')})
  `, (err, res, field) => {
        if (err) throw err
        console.log(field)
        cb(res)
    })
}

exports.deleteShopping = (id, cb) => {
    const query = db.query(`
  DELETE FROM shopping
  WHERE id = ${id}
  `, (err, res, field) => {
        if (err) throw err
        console.log(field)
        cb(res)
    })
}

exports.updateShopping = (id, data, cb) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
    UPDATE shopping
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
        if (err) throw err
        cb(res)
    })
}