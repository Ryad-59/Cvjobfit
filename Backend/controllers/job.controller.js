const db = require('../config/db')

exports.saveJobOffer = async (req, res) => {
  try {
    const { cvId, text } = req.body
    
    await db.execute('INSERT INTO job_offers (cvId, text) VALUES (?, ?)', [cvId, text])
    
    res.status(201).json({ message: 'Job offer saved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
