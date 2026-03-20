# facteur
Le programme implémentant le schéma de résolution du problème du facteur est: facteur/pourlefacteur.js.
Vous pouvez lancer: `npm run facteur` ou `node facteur/pourlefacteur.js`. Son paramétrage est intuitif.

# mathenjean
Le programme considère la partie comme perdu une fois qu'un joueur est forcé à jouer 1.
## résultat
Les resultats sont stockés dans le dossier cartes/resultats.
un tableau présentant les résultats sous la forme: nombres de cartes; nombre de nombres premiers>n/2; quel joueur gagne; nombre de parties possibles est stocké dans le fichier result.ods.
Les "tables de vérité" pour toute les parties que nous avons générerées ne devrait pas être utilisées pour jouer une partie; utilisez plutôt le "package" app.
Le fichier nbprem.txt donne tous les nombres pour lesquels la stratégies des nombres semi-premiers marchent.
## utilisation
ATTENTION: les programmes sont conçus sur et pour linux et devrait fonctionner sur macOS, sur Windows en revanche les programmes JavaScript devrait fonctionner mais les programmes c demanderait une adaptation préalable.
ATTENTION: dû à leur structure il n'est pas impossible que sur des valeurs inférieur à 5 les programmes ne fonctionnent pas correctement.
### dependances
* javascript: `node`, `npm` (optionnel)
* c: `gcc`, `npm` (optionnel)
Si vous n'avez pas `npm` veulliez copier la commande que vous souhaitez exécuter depuis le fichier package.json.
### javascript
#### nb_premier.js
Programme perméttant de calculer les configurations où la méthode des nombres premiers marchent.
##### Paramétrage
Il faut modifier la variable `max` de la 2em ligne
##### Exécution
Utilisez la commande `npm run nb_premier`
#### generertabledesresultats.mjs
Permet un récap sur des nombres assez faibles (<36) stipulant quel joueur gagne en fonction du nombre de cartes.
##### Paramétrage
La variable `range` ligne 2 contient la plage de valeur que le programme va essayer.
##### Exécution
Utilisez la commande `npm run genererresume`
#### use.mjs
Programme donnant une "table de vérité" en fonction du nombre de cartes du jeux.
##### Paramétrage
La variable `len` ligne 2 permet de stipuler le nombre de cartes dans le jeux.
##### Exécution
Utilisez la commande `npm run start`
#### chat.mjs
Interface en ligne de commande pour détruire ses adversaires
##### Paramétrage
Aucun
##### Exécution
Utilisez la commande `npm run chat`
#### graph.js
##### Paramétrage
Voir les commentaires du fichier
##### Exécution
Utilisez la commande `npm run graph`
