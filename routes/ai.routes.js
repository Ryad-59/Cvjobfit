import { Router } from 'express';
import { matchCvWithJobOffer } from '../services/gemini.service.js';

const router = Router();

// POST /api/ai/match
// Body: { cvText: string, jobOfferText: string }
router.post('/match', async (req, res, next) => {
  try {
    const { cvText, jobOfferText } = req.body;

    if (!cvText || !jobOfferText) {
      return res.status(400).json({
        error: 'cvText et jobOfferText sont obligatoires.',
      });
    }

    const result = await matchCvWithJobOffer({ cvText, jobOfferText });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
