# mathenjean
Le programme considère la partie comme perdu une fois qu'un joueur est forcé à jouer 1
## résultat
un tableau présentant les résultats sous la forme: nombres de cartes; nombre de nombres premiers>n/2; quel joueur gagne; nombre de parties possibles est stocké dans le fichier result.ods
## utilisation
ATTENTION: les programmes sont conçus sur et pour linux et devrait fonctionner sur macOS, sur Windows en revanche les programmes JavaScript devrait fonctionner mais les programmes c demanderait une adaptation préalable
### dependances
* javascript: `node`
* c: `gcc`
### javascript
la logique est stockée dans le fichier proto1.mjs
#### utilisation simplifié
Pour générer une arborescence de fichiers et dossiers qui contient "the" méthode parfaite changer la variable len dans use.mjs et éxécuter ce même fichier:
`node use.mjs`

#### interactivité
le fichier chat.mjs permet d'avoir un shell interactif.
`node app/chat.mjs`
### C

#### proto2.c
##### paramétrage
Dans compile_option.h changer `NUMBER_OF_CARDS` et `COMPILE_MAX_CHILDREN` a `ceil(NUMBER_OF_CARDS/2)`
##### compilation
`gcc proto2.c -o a.out`
##### executer
`./a.out`
#### multithreading
Attention le programme suivant est construit de façon a utiliser le CPU au maximum ceci peut entraîner une surchauffe et des lenteurs sur les autres processus 
UTILISEZ LE PROGRAMME SEULEMENT SI VOUS CONSIDEREZ LES RISQUES FAIBLES MAIS PRÉSENT ÉNONCÉS CI-DESSUS
##### paramétrage
Dans compile_option.h changer `NUMBER_OF_CARDS` et `COMPILE_MAX_CHILDREN` a `ceil(NUMBER_OF_CARDS/2)`
##### utilisation 
`./run.sh`
note: si besoin donner les permissions d'exécution au programme 
`chmod +x run.sh