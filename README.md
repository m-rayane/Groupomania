# Groupomania

##### _Social-network of the Groupomania company_

## **Installation** :

**Back-end**

- Open a shell in Groupomania folder
- Jump in backend folder with `cd backend`
- Download backend required dependencies with `npm install`
- Start the API with `nodemon` command
- configure the .env file like the .env.example file

**Front-end**

- Open another shell in Groupomania folder
- Jump in frontend folder with `cd frontend`
- Download frontend dependencies with `npm install`
- Start the application with `npm start`
- If your browser didn't start by itself, open it, and search for `http://localhost:3000`

## List of dependencies

**Back-end**

```
    bcrypt: v5.0.1,
    body-parser: v1.20.0,
    cookie-parser: v1.4.6,
    cors: v2.8.5,
    dotenv: v16.0.1,
    express: v4.18.1,
    express-mongo-sanitize: v2.2.0,
    helmet: v5.1.0,
    jsonwebtoken: v8.5.1,
    mongoose: v6.4.4,
    mongoose-unique-validator: v3.1.0,
    multer: v1.4.5-lts.1

dev:

    nodemon: v2.0.19

```

**Front-end**

```
    @testing-library/jest-dom: v5.16.5,
    @testing-library/react: v13.4.0,
    @testing-library/user-event: v13.5.0,
    axios: v0.27.2,
    node-sass: v7.0.3,
    prop-types: v15.8.1,
    react: v18.2.0,
    react-dom: v18.2.0,
    react-moment: v1.1.2,
    react-router-dom: v6.4.1,
    react-scripts: 5.0.1,
    styled-components: v5.3.6,
    web-vitals: v2.1.4
```

# Groupomania 🖥

Septième projet du parcours "Développeur web" d'OpenClassroom. L'objectif est de construire **From Scratch** un réseau social d'entreprise.


#  Technologies utilisées

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" /> <img src="https://camo.githubusercontent.com/4e4a3b5c3e9c00501ec866e2f2466c5a6032f838aca5f2cf3b14450e39e8a2f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742532302d2532333230323332612e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642"/>
 

## API Routes

Toutes les routes doivent disposer d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer »). Avant que l'utilisateur puisse apporter des utiliser les routes **put** et **delete**, le code doit vérifier si l'userId actuel correspond à l'userId du profil, du post ou du commentaire. Cela permet de s'assurer que seul le propriétaire du profil, des posts ou des commentaires peut apporter des modifications à celle-ci ou les supprimer.
**L'administrateur** quant à lui, peut, supprimer n'importe quel commentaire, post ou profil.

## Exigences de sécurité

-   Le mot de passe de l'utilisateur doit être haché.
-   L'authentification doit être renforcée sur toutes les routes requises.
-   Les adresses électroniques dans la base de données sont uniques.
-   La sécurité de la base de données MySQL ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.
-   Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.
-   Le contenu du dossier images et dotenv ne doit pas être téléchargé sur GitHub.


# Installation

**Backend :**
- Télécharger *NodeJS*
- Créer un fichier `.env` pour remplir les variables d'environnements
- Se rendre dans le dossier `Backend`, installer Node et toute les dépendances avec `npm i`
- Lancer le serveur avec `npm run dev`
- Utiliser `Ctrl+C` pour stopper le serveur
- Utilisation du `PORT=3000`

**Frontend :**
- Ouvrir un nouveau terminal et se rendre dans le dossier `Frontend`
- Lancer React avec la commande `npm start`
