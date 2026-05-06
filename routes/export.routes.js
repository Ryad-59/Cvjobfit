import { Router } from 'express';
import { generateCvPdf } from '../services/pdf.service.js';

const router = Router();

const demoCvById = {
  demo: {
    fullName: 'Julie Ahery',
    title: 'Developpeuse web junior',
    email: 'julie@example.com',
    phone: '+33 6 00 00 00 00',
    summary: 'Developpeuse junior motivee par les projets web, les API et les interfaces propres.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'SQL'],
    experiences: [
      {
        role: 'Projet academique - Application CV',
        company: 'Ecole',
        period: '2026',
        details: [
          'Creation d une interface de CV avec React.',
          'Integration d une API Express pour sauvegarder les donnees.',
        ],
      },
    ],
  },
};

// GET /api/cv/:id/export
// A remplacer plus tard par une vraie recuperation Prisma/PostgreSQL.
router.get('/:id/export', async (req, res, next) => {
  try {
    const cv = demoCvById[req.params.id];

    if (!cv) {
      return res.status(404).json({
        error: 'CV introuvable. Utilise /api/cv/demo/export pour tester.',
      });
    }

    const pdfBuffer = await generateCvPdf(cv);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="cv-${req.params.id}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
});

export default router;
