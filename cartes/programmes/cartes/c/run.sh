#/bin/zsh
gcc ./cartes/programmes/cartes/c/proto3.c -o ./cartes/programmes/cartes/c/a.out
gcc ./cartes/programmes/cartes/c/proto4.c -o ./cartes/programmes/cartes/c/gen.out
./cartes/programmes/cartes/c/gen.out | node ./cartes/programmes/cartes/c/regroupement.js | tail -n 1
