import { GoogleGenAI, Type } from '@google/genai';
import { matchCvLocally } from './local-match.service.js';

const DEFAULT_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash'];

let client;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error('GEMINI_API_KEY manquante dans le fichier .env.');
    error.status = 500;
    throw error;
  }

  if (!client) {
    client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return client;
}

const matchSchema = {
  type: Type.OBJECT,
  properties: {
    score: {
      type: Type.INTEGER,
      description: 'Score de compatibilite entre le CV et l offre, entre 0 et 100.',
    },
    summary: {
      type: Type.STRING,
      description: 'Resume court du niveau de compatibilite.',
    },
    matchedKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Mots-cles de l offre retrouves dans le CV.',
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Mots-cles importants absents ou trop peu visibles dans le CV.',
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          priority: {
            type: Type.STRING,
            enum: ['high', 'medium', 'low'],
          },
          message: {
            type: Type.STRING,
          },
        },
        required: ['priority', 'message'],
        propertyOrdering: ['priority', 'message'],
      },
      description: 'Suggestions concretes pour ameliorer le CV.',
    },
  },
  required: ['score', 'summary', 'matchedKeywords', 'missingKeywords', 'suggestions'],
  propertyOrdering: ['score', 'summary', 'matchedKeywords', 'missingKeywords', 'suggestions'],
};

export async function matchCvWithJobOffer({ cvText, jobOfferText }) {
  const prompt = `
Tu es un assistant RH specialise dans l analyse de CV.
Compare le CV avec l offre d emploi.
Retourne des conseils concrets, utiles et faciles a appliquer.
Ne mens pas: si une competence est absente du CV, indique qu elle manque.

CV:
${cvText}

Offre d emploi:
${jobOfferText}
`;

  const models = process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL, ...DEFAULT_MODELS.filter((model) => model !== process.env.GEMINI_MODEL)]
    : DEFAULT_MODELS;

  let lastError;

  for (const model of models) {
    try {
      const response = await getClient().models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: matchSchema,
        },
      });

      return JSON.parse(response.text);
    } catch (error) {
      lastError = error;

      if (![429, 500, 502, 503, 504].includes(error.status)) {
        throw error;
      }
    }
  }

  console.warn(`Gemini indisponible, fallback local utilise: ${lastError?.message || lastError}`);
  return matchCvLocally({ cvText, jobOfferText });
}
