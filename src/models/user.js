const db = require('../helpers/db')

exports.getAllUser = () => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT id, username, email, phone, country, city, postcode, name, address FROM user
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getUsersByConditionAsync = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM user WHERE ${Object.keys(cond).map(item => `${item}="${cond[item]}"`).join(' AND ')}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createUserAsync = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO user
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}