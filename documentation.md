# Documentation du Projet Tic-Tac-Toe Dynamique

## Présentation du Projet

Ce projet est un jeu de Morpion (Tic-Tac-Toe) dynamique et personnalisable, permettant aux utilisateurs de configurer plusieurs aspects du jeu, tels que la taille de la grille, les symboles des joueurs et les conditions de victoire.

## Structure du Projet

Le projet est composé de trois fichiers principaux :

- `index.html` : Structure de l'interface utilisateur
- `styles.css` : Mise en page et style visuel
- `app.js` : Logique du jeu et fonctionnalités

## Fonctionnalités

### Personnalisation du jeu

1. **Taille de la grille** : Les joueurs peuvent choisir la taille de la grille (n×n) avec une valeur minimale de 3 et maximale de 10.
2. **Condition de victoire** : Les joueurs peuvent définir le nombre de symboles alignés nécessaires pour gagner (k).
3. **Symboles personnalisables** : Chaque joueur peut choisir son symbole parmi plusieurs options (X, O, ★, ♦, etc.).

### Système de jeu

1. **Tour par tour** : Alternance entre les deux joueurs.
2. **Détection de victoire** : Vérification des lignes, colonnes et diagonales pour déterminer le gagnant.
3. **Système de score** : Suivi des victoires pour chaque joueur et des matchs nuls.

### Sauvegarde et chargement

1. **Sauvegarde locale** : L'état du jeu est sauvegardé dans le stockage local du navigateur.
2. **Chargement automatique** : Restauration de l'état du jeu lors du rechargement de la page.
3. **Visualisation des données sauvegardées** : Option pour afficher l'état sauvegardé.

## Architecture Technique

### Structure de données

Le jeu utilise un objet `gameState` qui contient toutes les informations nécessaires à la gestion de l'état du jeu :

```javascript
let gameState = {
  currentPlayer: 1,
  gridSize: 3,
  winCondition: 3,
  gameActive: true,
  player1Symbol: "X",
  player2Symbol: "O",
  scores: {
    player1: 0,
    player2: 0,
    draws: 0,
  },
};
```

### Fonctions principales

1. `initializeGame()` : Initialise le jeu et configure les écouteurs d'événements.
2. `createGameBoard()` : Génère dynamiquement la grille de jeu en fonction de la taille choisie.
3. `handleCellClick()` : Gère les interactions des joueurs avec la grille.
4. `saveGameState()` : Sauvegarde l'état du jeu dans le stockage local.
5. `loadGameState()` : Charge l'état du jeu depuis le stockage local.

## Interface Utilisateur

L'interface utilisateur est divisée en plusieurs sections :

1. **En-tête** : Affiche le titre du jeu "Play X O" et le sous-titre "Jeu dynamique".
2. **Panneau de paramètres** : Permet aux joueurs de configurer leurs symboles.
3. **Contrôles du jeu** : Permet de définir la taille de la grille et les conditions de victoire.
4. **Informations de jeu** : Affiche le joueur actuel et les scores.
5. **Plateau de jeu** : Grille interactive où se déroule le jeu.
6. **Boutons d'action** : Permet de réinitialiser la partie ou les scores.

## Comment utiliser l'application

1. **Configuration initiale** :

   - Choisissez les symboles pour chaque joueur
   - Définissez la taille de la grille désirée
   - Définissez le nombre de symboles alignés nécessaires pour gagner

2. **Démarrage d'une partie** :

   - Cliquez sur "Démarrer une nouvelle partie"
   - Le joueur 1 commence toujours

3. **Pendant le jeu** :

   - Cliquez sur une case vide pour placer votre symbole
   - Le jeu alterne automatiquement entre les joueurs
   - Le statut actuel est affiché dans la section d'information

4. **Fin de partie** :
   - Une victoire est annoncée lorsque le nombre requis de symboles sont alignés
   - Les scores sont automatiquement mis à jour
   - Utilisez "Rejouer la manche" pour continuer avec les mêmes paramètres
   - Utilisez "Réinitialiser les scores" pour remettre les scores à zéro

## Technologies utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles et animations
- **JavaScript** : Logique du jeu et interactions


