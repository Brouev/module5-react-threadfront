# Installer les dépendances
```bash
npm install
```

# Lancer l'application
```bash
npm run dev
```

# Lancer le conteneur Docker MySQL
```bash
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d --name=bdd mysql
```

## Cours Node.js - Module 4 : Thread API

# Module 4 — Node.js et Express
Voici le lien du module 4 : https://github.com/CHAOUCHI/cdpi-dwwm/tree/1-phase2-use-case-projects-mvc/Phase%202%20-%20MVC%20REST%20et%20SPA/4.%20NodeJS%20-%20API%20REST%20(js%20backend)

Le projet est ThreadAPI : https://github.com/CHAOUCHI/cdpi-dwwm/tree/1-phase2-use-case-projects-mvc/Phase%202%20-%20MVC%20REST%20et%20SPA/4.%20NodeJS%20-%20API%20REST%20(js%20backend)/Projet%20ThreadAPI

Documentation Express : https://expressjs.com/  
Documentation Sequelize : https://sequelize.org/docs/v6/getting-started/  
Documentation JWT : https://www.npmjs.com/package/jsonwebtoken  
Documentation bcrypt : https://www.npmjs.com/package/bcrypt

## Plan d'action
1. Lire le cahier des charges  
2. Faire l'inventaire des routes de l'API  
3. Écrire sur une feuille les requêtes SQL que vous pensez nécessaires pour cette application (vous pouvez vous tromper :) )  
4. Relier, selon vous, les requêtes SQL aux routes nécessaires  
5. Faire le cours sur Sequelize  
6. Mettre en place les modèles pour ThreadAPI  
7. Faire le cours sur Express  
8. Mettre en place les routes de ThreadAPI puis utiliser les modèles précédemment créés  
9. Lire le cours sur JWT et le guide « Comment sécuriser une application »  
10. Sécuriser l'API