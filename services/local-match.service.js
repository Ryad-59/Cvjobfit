const STOP_WORDS = new Set([
  'avec',
  'dans',
  'des',
  'les',
  'une',
  'pour',
  'nous',
  'vous',
  'sur',
  'est',
  'sont',
  'plus',
  'notre',
  'votre',
  'aux',
  'the',
  'and',
  'for',
  'with',
  'you',
  'our',
]);

const IMPORTANT_SKILLS = [
  'javascript',
  'typescript',
  'react',
  'next',
  'node',
  'express',
  'postgresql',
  'sql',
  'prisma',
  'api',
  'rest',
  'docker',
  'python',
  'java',
  'figma',
  'tailwind',
  'git',
  'tests',
  'authentification',
  'jwt',
];

function normalize(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#. ]/g, ' ');
}

function extractKeywords(text) {
  const normalizedText = normalize(text);
  const words = normalizedText.split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const foundSkills = IMPORTANT_SKILLS.filter((skill) => normalizedText.includes(skill));
  return [...new Set([...foundSkills, ...words.slice(0, 40)])];
}

export function matchCvLocally({ cvText, jobOfferText }) {
  const cv = normalize(cvText);
  const jobKeywords = extractKeywords(jobOfferText);
  const matchedKeywords = jobKeywords.filter((keyword) => cv.includes(keyword));
  const missingKeywords = jobKeywords.filter((keyword) => !cv.includes(keyword)).slice(0, 10);
  const score = jobKeywords.length
    ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
    : 0;

  const suggestions = missingKeywords.slice(0, 5).map((keyword, index) => ({
    priority: index < 2 ? 'high' : 'medium',
    message: `Ajoutez ou mettez davantage en avant "${keyword}" si cette competence correspond vraiment a votre profil.`,
  }));

  if (suggestions.length === 0) {
    suggestions.push({
      priority: 'low',
      message: 'Le CV reprend deja les mots-cles principaux de l offre. Ajoutez des resultats concrets pour renforcer l impact.',
    });
  }

  return {
    score,
    summary: `Analyse locale: ${matchedKeywords.length} mot(s)-cle(s) de l offre retrouve(s) sur ${jobKeywords.length}.`,
    matchedKeywords: matchedKeywords.slice(0, 12),
    missingKeywords,
    suggestions,
    provider: 'local-fallback',
  };
}
