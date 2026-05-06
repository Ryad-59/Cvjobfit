const db = require('../config/db')

exports.create = async (cvId, text) => {
  return db.execute('INSERT INTO job_offers (cvId, text) VALUES (?, ?)', [cvId, text])
}

exports.findByCVId = async (cvId) => {
  const [rows] = await db.execute('SELECT * FROM job_offers WHERE cvId = ?', [cvId])
  return rows
}
