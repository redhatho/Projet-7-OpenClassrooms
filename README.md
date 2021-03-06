# GROUPOMANIA

## Créez un réseau social d’entreprise

### Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

_Utilisation de_:

- MySql
- Sequelize
- NodeJS
- express
- ReactJs

---

# INSTALLATION

Clonez ce repository : https://github.com/redhatho/Projet-7-OpenClassrooms.git

Dans le dossier backend, modifier le fichier :

`.sample.env`

en

`.env`

et compléter avec vos informations :

```
#PORT DU SERVEUR
PORT=""

(Le port du back doit être le même que le port du front situé dans ultils/api)

#SECRET KEY POUR LE TOKEN
TOKEN = ""


# IDENTIFIANT CONCERNANT LA BASE DE DONNEES
 DB_HOST = ""
 DB_USER = ""
 DB_NAME = ""
 DB_PASSWORD = ""
 DB_DIALECT = ""


 #URL CLIENT
 CLIENT_URL = ""
```

Créer ensuite, toujours dans le dossier backend, un dossier :

`images`

---

# BASE DE DONNEES

**Une base donnée est nécessaire pour le fonctionnement du site web. La configuration de celle-ci se trouve dans le back-end sur le chemin :**

`./config/database.js`

---

# LANCEMENT DU PROJET :

- **BACKEND**

```bash

cd backend

npm install

nodemon server

```

- **FRONTEND (client)**

```bash

cd client

npm install

npm start

```

---

### redhatho


