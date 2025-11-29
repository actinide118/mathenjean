#/bin/zsh
gcc proto3.c
gcc proto4.c -o gen.out
./gen.out | node regroupement.js | tail -n 1
