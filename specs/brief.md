# Brief Projet : CVJobFit

## 1. Description du Projet
CVJobFit est une plateforme web intelligente conçue pour accompagner les chercheurs d'emploi dans leur démarche de candidature. L'outil utilise l'intelligence artificielle pour analyser une offre d'emploi et optimiser le CV de l'utilisateur en conséquence, maximisant ainsi ses chances d'être sélectionné.

## 2. Problématique
Les chercheurs d'emploi perdent un temps précieux à adapter manuellement leur CV pour chaque offre. De plus, ils ne savent pas toujours mettre en avant les bons mots-clés ou les compétences spécifiques recherchées par les recruteurs ou les systèmes ATS (Applicant Tracking Systems).

## 3. Objectifs
- **Automatiser** l'adaptation du CV aux offres d'emploi.
- **Optimiser** le contenu pour les algorithmes de recrutement (ATS).
- **Suggérer** des améliorations de rédaction via l'IA.
- **Générer** des versions de CV exportables (PDF).

## 4. Cible Utilisateur
- Chercheurs d'emploi actifs.
- Étudiants et jeunes diplômés.
- Professionnels en reconversion.

## 5. Fonctionnalités Clés (MVP)

### A. Gestion du CV de Base
- Création de CV from scratch via un éditeur WYSIWYG.
- Import de CV existant (PDF/DOCX) pour analyse et modification.
- Stockage sécurisé des données personnelles et expériences.

### B. Analyse par IA
- **Input Offre d'Emploi** : Collage du texte de l'offre ou import du fichier.
- **Matching** : Comparaison des compétences du CV vs les exigences de l'offre.
- **Suggestions** : L'IA propose des reformulations pour les descriptions de postes ou suggère l'ajout de compétences manquantes.

### C. Génération et Export
- Prévisualisation en temps réel des modifications.
- Export du CV optimisé en format PDF.
- Option pour générer une lettre de motivation personnalisée (Bonus).

## 6. Flux Utilisateur
1. L'utilisateur s'inscrit/se connecte.
2. Il importe ou crée son CV de base.
3. Il colle l'URL ou le texte de l'offre d'emploi cible.
4. L'IA scanne l'offre et met en surbrillance les écarts dans le CV.
5. L'utilisateur valide les suggestions de l'IA (compétences, verbes d'action, etc.).
6. Il prévisualise et exporte le CV final.

## 7. Stack Technique Suggérée
- **Frontend** : React / Next.js (pour le référencement et la rapidité).
- **Backend** : Node.js (Express) ou Python (FastAPI) pour gérer la logique IA.
- **IA** : OpenAI API (GPT-4) ou Claude API pour l'analyse et la réécriture.
- **Base de données** : PostgreSQL (via Supabase ou Prisma).
- **Stockage fichiers** : AWS S3 ou Cloudinary (pour les CV uploadés).
- **Export** : Puppeteer ou html2pdf pour la génération de PDF.

## 8. Contraintes & Défis
- **Confidentialité** : RGPD - Les données des CV doivent être sécurisées et potentiellement chiffrées.
- **Précision de l'IA** : Éviter les hallucinations (inventer de fausses expériences).
- **Design** : Interface must be clean et professionnelle (UX/UI soignée).

## 9. Jalons (Timeline indicative)
1. **Phase 1 (2 semaines)** : Setup technique, Authentification, Import CV.
2. **Phase 2 (3 semaines)** : Intégration API IA, Algorithme de matching.
3. **Phase 3 (2 semaines)** : Éditeur de CV, Prévisualisation en direct.
4. **Phase 4 (1 semaine)** : Export PDF et tests utilisateurs.

## 10. Métriques de Succès (KPIs)
- Nombre de CV générés par mois.
- Taux de conversion (Utilisateur gratuit vers Premium).
- Score de matching moyen atteint par les utilisateurs.
