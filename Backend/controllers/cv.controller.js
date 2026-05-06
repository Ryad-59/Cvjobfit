const db = require('../config/db')
const fs = require('fs')
const path = require('path')
const { parsePDF } = require('../services/pdfParser')
const { parseDOCX } = require('../services/docxParser')

exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier fourni' })

    const filePath = req.file.path
    const ext = path.extname(req.file.originalname).toLowerCase()
    let content = ''

    if (ext === '.pdf') {
      content = await parsePDF(filePath)
    } else if (ext === '.docx') {
      content = await parseDOCX(filePath)
    }

    const userId = req.user.userId
    const [existing] = await db.execute('SELECT * FROM cvs WHERE userId = ?', [userId])

    if (existing.length > 0) {
      await db.execute('UPDATE cvs SET content = ? WHERE userId = ?', [content, userId])
    } else {
      await db.execute('INSERT INTO cvs (userId, content) VALUES (?, ?)', [userId, content])
    }

    res.json({ message: 'CV uploadé et parsé avec succès', content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createOrUpdateCV = async (req, res) => {
  try {
    const userId = req.user.userId
    const { content } = req.body
    
    const [existing] = await db.execute('SELECT * FROM cvs WHERE userId = ?', [userId])
    
    if (existing.length > 0) {
      await db.execute('UPDATE cvs SET content = ? WHERE userId = ?', [content, userId])
    } else {
      await db.execute('INSERT INTO cvs (userId, content) VALUES (?, ?)', [userId, content])
    }
    
    res.json({ message: 'CV saved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getCV = async (req, res) => {
  try {
    const [cvs] = await db.execute('SELECT * FROM cvs WHERE id = ?', [req.params.id])
    if (cvs.length === 0) return res.status(404).json({ error: 'CV not found' })
    res.json(cvs[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
