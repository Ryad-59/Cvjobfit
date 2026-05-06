const db = require('../config/db')

exports.create = async (email, password) => {
  return db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password])
}

exports.findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
  return rows[0]
}
