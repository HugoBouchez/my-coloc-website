# 🚀 Guide de Déploiement - My Coloc Website

## Étape 1 : Créer le dépôt GitHub

1. Allez sur https://github.com/new
2. Nommez votre dépôt (ex: `my-coloc-website`)
3. **Ne cochez PAS** "Initialize with README" (vous avez déjà un README)
4. Cliquez sur "Create repository"

## Étape 2 : Connecter le dépôt local à GitHub

Après avoir créé le dépôt, GitHub vous donnera des commandes. Exécutez-les dans votre terminal :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
git branch -M main
git push -u origin main
```

**Remplacez** :
- `VOTRE_USERNAME` par votre nom d'utilisateur GitHub
- `VOTRE_REPO` par le nom de votre dépôt

## Étape 3 : Déployer sur Vercel (Recommandé pour Next.js)

### Option A : Via l'interface Vercel (Le plus simple)

1. Allez sur https://vercel.com
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "Add New Project"
4. Sélectionnez votre dépôt `my-coloc-website`
5. Vercel détectera automatiquement Next.js
6. Cliquez sur "Deploy"
7. Votre site sera en ligne en quelques minutes ! 🎉

### Option B : Via la ligne de commande

```bash
npm i -g vercel
vercel
```

Suivez les instructions à l'écran.

## Étape 4 : Configuration Vercel

Vercel configurera automatiquement :
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `.next`
- ✅ Install Command : `npm install`

**Aucune configuration supplémentaire nécessaire !**

## 🌐 Votre site sera accessible sur :

Après le déploiement, vous obtiendrez une URL comme :
- `https://my-coloc-website.vercel.app`

Vous pouvez aussi configurer un nom de domaine personnalisé dans les paramètres Vercel.

## 🔄 Mises à jour automatiques

À chaque fois que vous pousserez du code sur GitHub :
```bash
git add .
git commit -m "Votre message"
git push
```

Vercel redéploiera automatiquement votre site ! 🚀

## 📝 Notes importantes

- Les données sont stockées dans le localStorage du navigateur
- Chaque utilisateur aura ses propres données localement
- Pour partager les données entre utilisateurs, il faudra migrer vers une base de données (Firebase, Supabase, etc.)

## 🆘 Besoin d'aide ?

- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs

