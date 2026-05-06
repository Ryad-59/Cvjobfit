require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const cvRoutes = require('./routes/cv.routes')
const jobRoutes = require('./routes/job.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/job-offer', jobRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
