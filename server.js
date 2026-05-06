import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import exportRoutes from './routes/export.routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cvjobfit' });
});

app.use('/api/ai', aiRoutes);
app.use('/api/cv', exportRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur serveur',
  });
});

app.listen(port, () => {
  console.log(`AI/export API running on http://localhost:${port}`);
});
