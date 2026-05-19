# Documentation of Choices : Jaggr


## 1. Choix Produit

- **Cible :** Les développeurs fatigués par les plateformes de recrutement traditionnelles.
- **Pain points :** Le manque de transparence salariale, l'obligation d'écrire des lettres de motivation, le bloquage des sites classiques derrière des abonnements payants et la redirection des sites classiques vers les sites des entreprises.
- **Valeur attendue :** La rapidité (swipe), la transparence (salaire et télétravail mis en avant) et l'absence de friction.

#### Why
Les développeurs sont très sollicités mais n'aiment pas le processus classique de recrutement. Ils veulent savoir rapidement si l'offre correspond à leurs critères stricts.

#### How
Implémentation d'une interface style "Tinder" (voir `frontend/dist/accueil/index.js` et `index.css`). L'utilisateur swipe à droite pour postuler ("matcher"), à gauche pour ignorer.

#### Trade-off
La mécanique de swipe limite la quantité de texte lisible au premier coup d'oeil. On sacrifie les longs détails de l'entreprise pour privilégier l'efficacité et la rapidité.


---


## 2. Choix du Dashboard

- Le tableau de bord (page profil) intègre des widgets analytiques basés sur les données de l'utilisateur, la possibilité d'ajouter / modifier son CV et les recommandations IA.

#### Why
Aider le candidat à ajuster ses attentes face au marché. S'il voit que 80% des offres qu'il like sont au-dessus de 60k€ mais qu'il n'a aucun retour, il peut ajuster sa stratégie.

#### How
La route `backend/DATA/datafeature.js` calcule un "Match Score" basé sur le nombre de matchs (candidatures acceptées) et refus. Il montre aussi la distribution des salaires des offres likées.

#### Trade-off
Le calcul des tranches salariales est une approximation plutôt qu'une donnée financière exacte, car l'API source renvoie une approximation des salaires.


---


## 3. Architecture

- L'application est séparée en un backend Node.js/Express et un frontend en HTML/CSS/JS vanilla. Le tout est packagé avec une base de données MySQL dans un conteneur Docker, ce qui rend le déploiement et l'exécution facile pour tout le monde. Le frontend intègre aussi Font Awesome.

#### Why
Permet un contrôle total sur le DOM pour tout gérer plus simplement. Font Awesome permet d'ajouter facilement des icônes sans avoir à chercher des images ailleurs.

#### How
Le code est partagé entre `backend/` et `frontend/dist/`. Les appels API utilisent `fetch`.

#### Trade-off
L'utilisation de JS normal (vanilla) rend le code frontend un peu plus long et légèrement plus complexe par rapport à React.


---


## 4. Choix Data

- Nous avons intégré l'API WeLoveDevs.

#### Why
C'est une source de données assez riche et réelle (les offres viennent des entreprises directement) avec des champs incluants le télétravail et les salaires.

#### How
Le fichier `backend/routes/jobs.js` récupère, formate et filtre les données. Nous avons implémenté un système de pagination par blocs de 50 offres, pour ne pas surcharger la page. La page vérifie aussi qu'il s'est écoulé au moins 2 secondes entre deux requêtes API pour éviter le rate limit.

#### Trade-off
Au moment du swipe, le frontend met en cache les offres (`loadedJobs`) et ne refait une requête que lorsqu'il reste moins de 5 offres. Etant donné que l'affinage des offres se fait côté front, sur les offres déjà chargées, la recherche est donc moins complète.

#### Alternatives rejetées
L'utilisation du paramètre de recherche de l'API WeLoveDevs (`q`) a été rejetée car il semblait très mal fait. Les résultats n'étaient pas pertinents et ne correspondaient pas à ce que nous cherchions. De plus, il ne permettait pas de filtrer les offres par salaire, par exemple.


---


## 5. Choix de l'IA

- [A FAIRE]

#### Why
[A FAIRE]

#### How
[A FAIRE]

#### Trade-off
[A FAIRE]


---


## 6. Choix de sécurité

#### Why
Les principales menaces sont l'usurpation d'identité, l'accès non autorisé aux CV des candidats, et les injections SQL.

#### How
1. **Authentification :** Utilisation de **JWT** pour les sessions. Les routes privées vérifient le header `Authorization` (voir `backend/routes/cv.js`).
2. **Base de données :** Utilisation systématique de requêtes préparées (`promisePool.query("SELECT ... WHERE id = ?", [id])`) pour empêcher toute injection SQL.
3. **Fichiers :** Le téléchargement du CV est innaccessible publiquement.

#### Trade-off
Le JWT stocké dans le `localStorage` est potentiellement vulnérable aux attaques XSS, mais cela a été préféré aux cookies pour faciliter l'intégration rapide avec un front potentiellement hébergé sur un domaine différent.


---


## 7. Choix d'intégration continue (CI)

#### Why
Empêcher la dégradation du code, vérifier la syntaxe et s'assurer que le backend reste stable lors du travail en équipe.

#### How
Le fichier `package.json` inclut une commande `npm run lint` et une commande `npm run test`. Un pipeline via GitHub Actions exécute ESLint et les tests sur chaque push, après avoir vérifié le bon fonctionnement du docker.

#### Trade-off
Le focus actuel est mis sur le linting plutôt que sur des tests unitaires complexes pour privilégier la vitesse d'itération.