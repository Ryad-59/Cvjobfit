const db = require('../config/db')

exports.create = async (userId, content) => {
  return db.execute('INSERT INTO cvs (userId, content) VALUES (?, ?)', [userId, content])
}

exports.update = async (userId, content) => {
  return db.execute('UPDATE cvs SET content = ? WHERE userId = ?', [content, userId])
}

exports.findByUserId = async (userId) => {
  const [rows] = await db.execute('SELECT * FROM cvs WHERE userId = ?', [userId])
  return rows[0]
}
