const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const [result] = await db.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    )
    
    const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET)
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
    if (users.length === 0) return res.status(404).json({ error: 'User not found' })
    
    const validPassword = await bcrypt.compare(password, users[0].password)
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' })
    
    const token = jwt.sign({ userId: users[0].id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
