# Security Measures: Jaggr


## 1. Secret Management
- **Why :** Empêcher la fuite de clés API (ex: WeLoveDevs) et de secrets (ex: JWT) dans le répo GitHub.
- **How :** Utilisation de la bibliothèque `dotenv` pour charger les variables d'environnement à partir d'un fichier local `.env` (exclu via `.gitignore`).
- **What :** Dans `backend/.env`. Les clés comme `JWT_SECRET` et `API_KEY` ne sont jamais en dur dans le code.


---


## 2. Protection contre les injections
- **Why :** Empêcher les attaquants de manipuler les requêtes SQL en insérant du code malveillant dans les inputs (ex: formulaire de connexion ou d'inscription).
- **How :** Utilisation systématique des "requêtes préparées" fournies par MySQL. Les entrées utilisateurs sont passées en tant que paramètres séparés, ce qui empêche leur interprétation comme du code SQL.
- **What :** Dans `backend/routes/user.js` : `"SELECT email, nom, prenom, role, cv FROM users WHERE id = ?", [userId]`.


---


## 3. Brute-force Mitigation
- **Why :** Ralentir les tentatives de deviner les mots de passe.
- **How :** Utilisation de `bcryptjs` pour le hachage des mots de passe lors de l'inscription et la vérification lors de la connexion. Le hachage est une opération lente. L'API WeLoveDevs effectue aussi un rate limit.
- **What :** Dans `backend/routes/register.js` pour la création de compte et `backend/routes/login.js` pour la vérification.


---


## 4. Sécurité des routes, sessions et tokens
- **Why :** S'assurer que seuls les utilisateurs authentifiés accèdent à leurs données personnelles (offres, CV, dashboard profil) et empêcher le détournement de session.
- **How :** Authentification via **JWT** signé côté serveur. Les routes d'API sensibles vérifient la validité du token extrait du header `Authorization: Bearer <token>`.


---


## 5. Flux d'authentification sécurisé
- **Why :** Assurer une transmission fiable des identifiants sans stocker le mot de passe en clair à aucun moment de la requête.
- **How :** L'utilisateur envoie ses identifiants avec une requête POST. Le serveur compare le hash bcrypt, génère un JWT contenant l'ID de l'utilisateur et le renvoie. Le client stocke ce token dans le `localStorage` pour authentifier les requêtes suivantes.
- **What :** Dans les routes `/api/register` et `/api/login`.


---


## 6. Gestion sécurisée des données en transit et au repos
- **Why :** Protéger les données sensibles des utilisateurs (comme l'adresse email) contre l'interception sur le réseau et la fuite de données en local.
- **How :** 
  - *En transit :* Utilisation de HTTPS pour chiffrer l'ensemble des échanges entre le client et l'API à implémenter avec un certificat SSL sur son hébergeur.
  - *Au repos :* Les mots de passe sont hashés avec bcryptjs. Les fichiers de CV téléchargés sont stockés dans un dossier isolé du serveur (`backend/uploads/cvs`) non exposé ni accessible publiquement.