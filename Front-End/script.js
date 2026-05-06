// script.js

const API_BASE = 'http://localhost:3001/api'; // Assumer backend local

// Gestion de l'authentification
let token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

// Fonction pour faire des requêtes API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(url, config);
    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
}

// Inscription
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            alert('Inscription réussie !');
            window.location.href = 'login.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Connexion
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            token = data.token;
            userId = data.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            alert('Connexion réussie !');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Dashboard
if (document.getElementById('cv-form')) {
    // Charger les CV
    loadCVs();

    // Soumettre le CV
    document.getElementById('cv-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-cv').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const content = { name, email, experience, skills };
        try {
            await apiRequest('/cv', {
                method: 'POST',
                body: JSON.stringify({ content })
            });
            alert('CV sauvegardé !');
            loadCVs();
            updatePreview(content);
        } catch (error) {
            alert(error.message);
        }
    });

    // Prévisualisation en temps réel
    document.getElementById('cv-form').addEventListener('input', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email-cv').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        updatePreview({ name, email, experience, skills });
    });
}

async function loadCVs() {
    try {
        const cvs = await apiRequest('/cv');
        const cvList = document.getElementById('cv-list');
        cvList.innerHTML = '';
        cvs.forEach(cv => {
            const div = document.createElement('div');
            div.innerHTML = `<h4>${cv.content.name}</h4><p>${cv.content.email}</p><button onclick="viewCV(${cv.id})">Voir</button>`;
            cvList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
    }
}

async function viewCV(id) {
    try {
        const cv = await apiRequest(`/cv/${id}`);
        updatePreview(cv.content);
    } catch (error) {
        alert(error.message);
    }
}

function updatePreview(content) {
    const preview = document.getElementById('cv-preview');
    preview.innerHTML = `
        <h3>${content.name}</h3>
        <p>Email: ${content.email}</p>
        <h4>Expériences</h4>
        <p>${content.experience}</p>
        <h4>Compétences</h4>
        <p>${content.skills}</p>
    `;
}