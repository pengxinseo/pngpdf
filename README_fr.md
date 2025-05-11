# Convertisseur PNG vers PDF en ligne

Un outil de conversion en ligne simple, rapide et gratuit pour transformer des images PNG en PDF.

## 📝 Présentation du projet

PNG vers PDF est une application web développée avec Next.js qui permet aux utilisateurs de convertir rapidement et facilement des images PNG en documents PDF. Aucun téléchargement de logiciel n'est nécessaire, et les conversions peuvent être effectuées directement dans votre navigateur.

### Caractéristiques principales

- 🚀 **Entièrement gratuit** : Toutes les fonctionnalités sont gratuites sans aucune limitation
- 🔒 **Sécurisé et fiable** : Toutes les conversions se font dans le navigateur sans téléchargement sur le serveur, protégeant ainsi votre vie privée
- 📱 **Compatible multi-plateformes** : Fonctionne sur ordinateurs, tablettes et téléphones mobiles
- 🌐 **Support multilingue** : Propose des interfaces en plus de 12 langues pour répondre aux besoins des utilisateurs du monde entier
- 🖼️ **Conversion par lot** : Permet de combiner plusieurs images PNG en un seul document PDF
- ⚙️ **Options de personnalisation** : Permet de sélectionner la taille du papier et les marges de page

## ✨ Fonctionnalités

- Conversion d'images PNG en documents PDF
- Support pour la conversion par lots (jusqu'à 30 images)
- Tailles de papier personnalisables (A4, A1, A2, et de nombreuses autres tailles standard)
- Marges de page ajustables
- Glisser-déposer pour réorganiser les images
- Téléchargement en un clic des résultats de conversion

## 🛠️ Stack technologique

- Next.js 14.2.3
- React 18
- TypeScript
- jsPDF (pour la génération de PDF)
- @dnd-kit (pour la fonctionnalité de glisser-déposer)
- Tailwind CSS
- next-intl (pour l'internationalisation)

## 🚀 Démarrage rapide

1. Cloner le dépôt :
```bash
git clone https://github.com/yourusername/pngpdf.git
cd pngpdf
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Visiter [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📖 Guide d'utilisation

1. Cliquez sur le bouton de téléchargement ou glissez-déposez des images PNG dans la zone désignée
2. Choisissez la taille du papier et les paramètres de marge (facultatif)
3. Pour les images uniques : Cliquez sur le bouton de téléchargement sous l'image correspondante
4. Pour plusieurs images : Cliquez sur le bouton "Fusionner" pour combiner toutes les images en un seul PDF
5. Téléchargez le fichier PDF généré

## 🌐 Support d'internationalisation

Ce projet prend en charge plusieurs langues pour répondre aux besoins des utilisateurs du monde entier :

| Code de langue | Nom de la langue | Région |
|---------------|-----------------|--------|
| 🇨🇳 `zh` | Chinois | Chine continentale |
| 🇺🇸 `en` | Anglais | Mondial |
| 🇯🇵 `ja` | Japonais | Japon |
| 🇰🇷 `ko` | Coréen | Corée |
| 🇫🇷 `fr` | Français | France |
| 🇩🇪 `de` | Allemand | Allemagne |
| 🇪🇸 `es` | Espagnol | Espagne |
| 🇷🇺 `ru` | Russe | Russie |
| 🇵🇹 `pt` | Portugais | Portugal |
| 🇹🇼 `tw` | Chinois traditionnel | Région de Taïwan |
| 🇻🇳 `vi` | Vietnamien | Vietnam |
| 🇮🇩 `id` | Indonésien | Indonésie |
| 🇮🇳 `hi` | Hindi | Inde |
| 🇵🇭 `fil` | Philippin | Philippines |
| 🇹🇷 `tr` | Turc | Turquie |
| 🇲🇾 `ms` | Malais | Malaisie |
| 🇸🇦 `ar` | Arabe | Pays arabes |

## 📂 Structure du projet

```
pngpdf/
├── content/                  # Répertoire de contenu de blog, organisé par langue
│   ├── zh/                   # Contenu chinois
│   ├── en/                   # Contenu anglais
│   ├── ...                   # Contenu dans d'autres langues
│   └── *.json                # Fichiers JSON de contenu exporté
├── messages/                 # Fichiers de traduction pour l'internationalisation
│   ├── zh.json               # Traductions chinoises
│   ├── en.json               # Traductions anglaises
│   └── ...                   # Traductions dans d'autres langues
├── public/                   # Ressources statiques
├── scripts/                  # Scripts utilitaires
│   ├── exportPosts.js        # Script d'exportation de contenu
│   ├── watchContent.js       # Script de surveillance de contenu
│   ├── createMdx.js          # Script de création de fichier MDX
│   └── deleteMdx.js          # Script de suppression de fichier MDX
├── src/                      # Répertoire du code source
│   ├── app/                  # Répertoire de l'application Next.js
│   │   └── [locale]/         # Routes internationalisées
│   │       └── [slug]/       # Routes dynamiques (articles de blog)
│   ├── components/           # Composants React
│   │   ├── PngToPdf.tsx      # Composant principal de conversion PNG vers PDF
│   │   ├── ui/               # Composants d'interface utilisateur
│   │   └── markdown/         # Composants de rendu Markdown
│   ├── configs/              # Fichiers de configuration
│   ├── lib/                  # Bibliothèques utilitaires
│   └── i18n.ts               # Configuration d'internationalisation
├── .next/                    # Répertoire de build Next.js
├── node_modules/             # Dépendances
├── package.json              # Configuration du projet
└── README.md                 # Documentation du projet
```

### Explication des répertoires

- **content/** : Contenu du blog stocké par langue, avec les fichiers JSON exportés
- **messages/** : Fichiers de traduction pour différentes langues, utilisés pour l'internationalisation de l'interface
- **scripts/** : Scripts liés à la gestion du contenu
- **src/app/** : Structure principale de l'application Next.js, prenant en charge les routes internationalisées
- **src/components/** : Divers composants React, dont le composant central de conversion PngToPdf
- **public/** : Ressources statiques comme les images et les icônes

## 📜 Guide d'utilisation des scripts

Le projet comprend plusieurs scripts utilitaires pour la gestion du contenu et le support d'internationalisation. Ces scripts se trouvent dans le répertoire `scripts/` :

### exportPosts.js
Exporte les fichiers de contenu pour toutes les langues au format JSON pour l'affichage du contenu du site web.

```bash
npm run export-posts
```

### watchContent.js
Surveille les changements dans les fichiers de contenu et met automatiquement à jour les fichiers JSON correspondants lorsque le contenu est modifié.

```bash
npm run content
```

### createMdx.js
Crée de nouveaux fichiers de contenu multilingues. Après avoir exécuté le script, saisissez un mot-clé pour créer les fichiers MDX correspondants dans tous les répertoires de langue.

```bash
npm run mdx
```

### deleteMdx.js
Supprime les fichiers de contenu multilingues pour un mot-clé spécifié. Après avoir exécuté le script, saisissez un mot-clé pour supprimer les fichiers MDX correspondants dans tous les répertoires de langue.

```bash
npm run del
```

### Flux de travail de gestion du contenu

1. Utilisez `npm run mdx` pour créer de nouveaux fichiers de contenu
2. Modifiez les fichiers `content/[langue]/[mot-clé].mdx`
3. Les modifications de contenu seront automatiquement mises à jour dans les fichiers JSON via `watchContent.js`
4. Utilisez `npm run del` lorsque vous devez supprimer du contenu

## 🔜 Plans futurs

- Développer une version plugin pour navigateur
- Ajouter plus d'options de personnalisation (arrière-plan, filigrane, etc.)
- Prendre en charge plus de formats d'image (JPEG, GIF, etc.)
- Optimiser l'expérience mobile

## 👨‍💻 Contributions

Les problèmes et les pull requests sont les bienvenus pour aider à améliorer ce projet !

## 📄 Licence

Ce projet est sous licence [MIT License](LICENSE).

## 📝 Droits d'auteur et attribution

© 2023-2024 PngPDF.net

### Comment citer ce projet

Si vous utilisez ou faites référence à ce projet dans votre propre projet ou article, veuillez le citer selon le format suivant :

```
Convertisseur PNG vers PDF - Développé par PngPDF.net
URL du projet : https://github.com/yourusername/pngpdf
```

### Déclaration de licence

Le code de ce projet est open-source sous la [licence MIT](LICENSE). Vous êtes libre de l'utiliser, de le modifier et de le distribuer, mais vous devez conserver la mention de droit d'auteur original et les informations de licence. Pour les conditions complètes, veuillez consulter le fichier [LICENSE](LICENSE). 