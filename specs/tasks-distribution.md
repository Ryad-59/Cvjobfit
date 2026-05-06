# Répartition des Tâches - Version Test (MVP)

**Objectif :** Version test fonctionnelle à la fin de la journée
**Équipe :** 3 membres

---

## 👤 Membre 1 - Frontend & UI (Next.js + Tailwind)

### Tâches prioritaires
- [ ] **Setup projet** : Initialiser Next.js + Tailwind CSS + configurations de base
- [ ] **Pages principales** :
  - Page d'accueil (Hero section + CTA)
  - Page de connexion/inscription (formulaire simple)
  - Dashboard utilisateur (liste des CV)
- [ ] **Composants CV** :
  - Éditeur de CV (formulaires : infos perso, expériences, compétences)
  - Prévisualisation CV en temps réel ( composant PDF-like)
- [ ] **Intégration API** : Connecter les formulaires au backend (axios/fetch)
- [ ] **Responsive** : Mobile/Desktop basique

### Livrables
- Interface complète et navigable
- Formulaires fonctionnels connectés au backend

---

## 👤 Membre 2 - Backend & API (Node.js/Express + MariaDB)

### Tâches prioritaires
- [ ] **Setup backend** : Initialiser Express + mysql2 (driver MariaDB) ou Sequelize/TypeORM
- [ ] **Base de données MariaDB** :
  - Créer la base `cvjobfit`
  - Tables : `users` (id, email, password, createdAt), `cvs` (id, userId, content, createdAt), `job_offers` (id, cvId, text, createdAt)
- [ ] **API Endpoints** :
  - `POST /api/auth/register` et `POST /api/auth/login` (JWT)
  - `POST /api/cv` (créer/modifier CV)
  - `GET /api/cv/:id` (récupérer CV)
  - `POST /api/job-offer` (sauvegarder l'offre d'emploi)
- [ ] **Upload fichier** : Endpoint pour importer CV (PDF/DOCX) - parsing basique
- [ ] **Sécurité** : Middleware d'authentification JWT
- [ ] **Connexion DB** : Configurer le pool de connexions MariaDB

### Livrables
- API RESTful fonctionnelle
- Base de données MariaDB opérationnelle
- Documentation rapide des endpoints (commentaire dans le code)

---

## 👤 Membre 3 - IA & Export (OpenAI API + PDF)

### Tâches prioritaires
- [ ] **Intégration IA** :
  - Connecter OpenAI API (GPT-4) ou Claude API
  - Endpoint `POST /api/ai/match` : Analyser l'offre vs CV et retourner un score + suggestions
  - Prompt engineering : Extraire les mots-clés de l'offre et comparer au CV
- [ ] **Génération PDF** :
  - Installer Puppeteer ou html2pdf
  - Endpoint `GET /api/cv/:id/export` : Générer et retourner le PDF
- [ ] **Logique de matching** :
  - Comparer compétences CV vs offre
  - Suggérer des modifications (ex: "Ajoutez Python, mentionné 5 fois dans l'offre")
- [ ] **Tests rapides** : Vérifier que l'IA répond correctement et que le PDF se génère

### Livrables
- Fonctionnalité IA opérationnelle
- Export PDF fonctionnel
- Script de test pour l'IA

---

## 🔗 Points de synchronisation (toutes les 2h)

1. **10h00** : Setup terminé (Frontend + Backend + IA connectés)
2. **12h00** : Formulaires + API + IA basique fonctionnels
3. **14h00** : Intégration complète (Frontend appelle le Backend qui appelle l'IA)
4. **16h00** : Tests utilisateurs et corrections de bugs
5. **17h00** : Déploiement version test (Vercel pour Frontend, Render/Railway pour Backend)

---

## 🛠 Stack recommandée pour aller vite
- **Frontend** : Next.js + Tailwind + shadcn/ui (composants prêts)
- **Backend** : Node.js + Express + Prisma + SQLite (plus simple que PostgreSQL pour test)
- **IA** : OpenAI API (plus rapide à intégrer)
- **PDF** : html2pdf.js (côté client) ou Puppeteer (côté serveur)
- **Auth** : JWT simple (pas d'OAuth pour la version test)
- **Déploiement** : Vercel (Frontend) + Render (Backend)

---

## ⚠️ Simplifications pour la version test
- Pas de paiement/abonnement
- Pas de vérification email
- Pas de gestion d'erreurs complexe
- PDF généré côté client (plus simple)
- Base de données locale (SQLite) ou Supabase gratuit
- Design "fonctionnel" pas "parfait"

---

## 📝 Fichiers partagés
- `specs/brief.md` : Brief du projet
- `specs/prd.json` : PRD détaillé
- `specs/tasks-distribution.md` : Ce fichier

Bonne chance à l'équipe ! 🚀
