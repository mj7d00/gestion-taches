# 📋 Gestion de Tâches — Mini-Projet 1 React.js

Application web de gestion de tâches avec les fonctionnalités CRUD complètes.  
Développée avec **React.js + Vite** (front-end) et **json-server** (back-end).

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le projet (front-end + back-end simultanément)
```bash
npm run start
```

Ou séparément :

```bash
# Terminal 1 — Back-end (json-server sur http://localhost:3001)
npm run server

# Terminal 2 — Front-end (Vite sur http://localhost:5173)
npm run dev
```

---

## 📁 Structure du projet

```
task-manager/
├── db.json                   # Base de données json-server
├── index.html                # Point d'entrée HTML
├── vite.config.js            # Configuration Vite
├── package.json
└── src/
    ├── main.jsx              # Point d'entrée React + BrowserRouter
    ├── App.jsx               # Routage principal (React Router)
    ├── index.css             # Styles globaux
    ├── api/
    │   └── tasksApi.js       # Fonctions d'appels API (fetch)
    ├── components/
    │   ├── Navbar.jsx        # Barre de navigation
    │   └── TaskCard.jsx      # Carte d'une tâche
    └── pages/
        ├── HomePage.jsx      # Liste des tâches (/)
        ├── AddTaskPage.jsx   # Formulaire ajout (/ajouter)
        ├── EditTaskPage.jsx  # Formulaire modification (/modifier/:id)
        └── NotFoundPage.jsx  # Page 404
```

---

## 🌐 Endpoints API

| Méthode | URL           | Description              |
|---------|---------------|--------------------------|
| GET     | /tasks        | Récupère toutes les tâches |
| GET     | /tasks/:id    | Récupère une tâche       |
| POST    | /tasks        | Crée une nouvelle tâche  |
| PUT     | /tasks/:id    | Met à jour une tâche     |
| DELETE  | /tasks/:id    | Supprime une tâche       |

---

## ✨ Fonctionnalités

- ✅ **Créer** une tâche (titre, description, statut)
- ✅ **Lire** la liste des tâches avec statistiques
- ✅ **Filtrer** par statut (À faire / En cours / Terminé)
- ✅ **Modifier** une tâche via formulaire pré-rempli
- ✅ **Supprimer** une tâche avec confirmation
- ✅ Gestion des erreurs & états de chargement
- ✅ Interface responsive

---

## 🛠️ Technologies

| Couche    | Technologie        |
|-----------|--------------------|
| Front-end | React 18 + Vite    |
| Routage   | React Router v6    |
| API calls | Fetch API          |
| Back-end  | json-server 0.17   |
| Style     | CSS personnalisé   |
