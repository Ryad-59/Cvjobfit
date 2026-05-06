import 'dotenv/config';
import { matchCvWithJobOffer } from '../services/gemini.service.js';

const cvText = `
Julie Ahery
Developpeuse web junior
Competences: JavaScript, React, Node.js, Express, SQL
Experience: creation d une application web avec authentification et dashboard.
`;

const jobOfferText = `
Nous recherchons un developpeur full stack junior.
Competences souhaitees: React, Node.js, Express, PostgreSQL, API REST, tests, Docker.
La connaissance de Python est un plus.
`;

const result = await matchCvWithJobOffer({ cvText, jobOfferText });
console.log(JSON.stringify(result, null, 2));
