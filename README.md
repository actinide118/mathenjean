# mathenjean
Le programme considère la partie comme perdu une fois qu'un joueur est forcé à jouer 1
## résultat
un tableau présentant les résultats sous la forme: nombres de cartes; nombre de nombres premiers>n/2; quel joueur gagne; nombre de parties possibles est stocké dans le fichier result.ods
## utilisation
### javascript
la logique est stockée dans le fichier proto1.mjs
#### utilisation simplifié
Pour générer une arborescence de fichiers et dossiers qui contient "the" méthode parfaite changer la variable len dans use.mjs et éxécuter ce même fichier

#### interactivité
le fichier chat.mjs permet d'avoir un shell interactif.

### C

#### proto2.c
##### paramétrage
Dans compile_option.h changer NUMBER_OF_CARDS et COMPILE_MAX_CHILDREN a ceil(NUMBER_OF_CARDS/2)
##### compilation
gcc proto2.c -o a.out
##### executer
./a.out
