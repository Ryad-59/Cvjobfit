# Cvjobfit - IA Gemini & Export PDF

Ce dossier contient la partie **Membre 3 - IA & Export** du projet Cvjobfit.

## Fonctionnalites

- `POST /api/ai/match` : compare un CV avec une offre d emploi via Gemini, avec fallback local si le quota API bloque.
- `GET /api/cv/:id/export` : genere un PDF du CV avec Puppeteer.
- `npm run test:ai` : teste rapidement la reponse IA avec un faux CV et une fausse offre.

## Installation

```bash
npm install
cp .env.example .env
```

Ajoute ensuite ta cle dans `.env` :

```bash
GEMINI_API_KEY=...
```

## Lancer le serveur

```bash
npm run dev
```

Le serveur demarre sur `http://localhost:4000`.

## Tester l IA

```bash
npm run test:ai
```

## Tester l export PDF

Ouvre cette URL dans le navigateur :

```txt
http://localhost:4000/api/cv/demo/export
```

## Integration dans le backend final

Quand le backend Express principal sera pret, il faudra copier :

- `routes/ai.routes.js`
- `routes/export.routes.js`
- `services/gemini.service.js`
- `services/local-match.service.js`
- `services/pdf.service.js`

Puis brancher les routes :

```js
app.use('/api/ai', aiRoutes);
app.use('/api/cv', exportRoutes);
```
