# Guide Backend - Cvjobfit

## Prérequis
- Node.js (v18+)
- MariaDB en cours d'exécution
- Base de données `cvjobfit` créée

## Installation
```bash
cd Backend
npm install
```

## Configuration
Copier `.env.example` vers `.env` et ajuster si besoin :
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cvjobfit
JWT_SECRET=cvjobfit_secret_key_2026
PORT=5000
```

## Base de données
Importer le schéma :
```bash
mysql -u root -p cvjobfit < DB.sql
```

## Lancer le serveur
```bash
npm run dev
```

## Endpoints disponibles
### Auth
- `POST /api/auth/register` : Inscription (body: email, password)
- `POST /api/auth/login` : Connexion (retourne token JWT)

### CV
- `POST /api/cv` : Créer/modifier CV (JSON, body: content)
- `GET /api/cv/:id` : Récupérer CV par ID
- `POST /api/cv/upload` : Upload CV PDF/DOCX (multipart/form-data, champ `cv`, max 5MB)

### Job Offer
- `POST /api/job-offer` : Sauvegarder offre d'emploi (body: text)

## Notes pour l'équipe
- Le dossier `uploads/` est ignoré par git (ne pas commit les fichiers uploadés)
- Tous les endpoints CV et Job Offer nécessitent un token JWT dans le header : `Authorization: Bearer <token>`
- Le parsing PDF/DOCX extrait le texte brut du CV et le sauvegarde en base
