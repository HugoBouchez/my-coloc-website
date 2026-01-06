# 🏠 Ma Coloc - Site Collaboratif

Un site web collaboratif pour organiser la vie en colocation : tâches ménagères, repas, courses et plus encore.

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Lancement rapide (Windows)

**Option 1 : Double-cliquez sur `lancer.bat`**
- Le fichier installera automatiquement les dépendances si nécessaire
- Le serveur démarrera automatiquement
- Le site sera accessible sur `http://localhost:3000`

**Option 2 : Lancement manuel**

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   - Le site sera accessible à l'adresse : `http://localhost:3000`
   - Partagez ce lien avec tous les colocataires !

## 📋 Fonctionnalités

### 1. Dashboard
- **Repas à venir** : Affiche automatiquement les repas d'aujourd'hui et de demain
- **Tâches prioritaires** : Liste les tâches prévues aujourd'hui et cette semaine
- Mise à jour automatique basée sur la date du jour

### 2. Tâches de la semaine
- Tableau modifiable avec les colonnes :
  - Poubelles
  - Commun
  - Cuisine
  - Frigo
  - Courses + essuies
  - Surprise
  - Vidanges
- Ajout/suppression de semaines
- Modification en ligne de chaque cellule
- Mise en évidence de la semaine en cours

### 3. Repas
- Vue calendrier mensuelle
- Ajout/modification/suppression de repas par jour
- Indication du cuisinier pour chaque repas
- Navigation entre les mois
- Mise en évidence du jour actuel

### 4. Courses
- Liste collaborative en temps réel
- Ajout d'articles
- Cocher/décocher (acheté/non acheté)
- Modification et suppression d'articles
- Statistiques (articles à acheter / achetés)
- Option pour vider la liste ou supprimer uniquement les articles achetés

## 💾 Stockage des données

Les données sont stockées localement dans le navigateur (localStorage). Cela signifie que :
- ✅ Aucune authentification nécessaire
- ✅ Données persistantes après rechargement
- ⚠️ Les données sont partagées entre tous les utilisateurs du même navigateur
- ⚠️ Si vous voulez partager entre différents appareils, vous devrez migrer vers une base de données (Firebase, etc.)

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **localStorage** - Persistance des données

## 📱 Responsive

Le site est entièrement responsive et fonctionne sur :
- 📱 Mobile
- 📱 Tablette
- 💻 Desktop

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎨 Personnalisation

Le site est conçu pour être facilement extensible. Vous pouvez :
- Ajouter de nouvelles rubriques dans la navigation
- Modifier les colonnes du tableau des tâches
- Personnaliser les couleurs dans `tailwind.config.js`

## 📝 Notes importantes

- Tous les utilisateurs peuvent modifier toutes les données
- Aucune authentification n'est requise
- Les données sont partagées entre tous les utilisateurs du même navigateur
- Pour un usage multi-appareils, envisagez d'intégrer Firebase ou une autre base de données

## 🤝 Contribution

Ce projet est conçu pour être simple et maintenable. N'hésitez pas à l'adapter à vos besoins !

---

**Bon partage en colocation ! 🎉**

