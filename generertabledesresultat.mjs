import { Suite } from "./proto1.mjs";
let range =[5,35];
function whowin(nbcards){
  let nbline = 0
  let refarr = [];
  for (let i = 1; i < nbcards+1; i++){
      refarr.push(i);
  }
  let player1win = false
  for (let i = 2;i <=nbcards; i+=2){
    let line = refarr.filter((e) => e !== i);

    let s = new Suite(line,true,i);
    
    let obj = s.toObject();
    if(obj.min_max_value ==1){
      player1win = true;
    }
    nbline += s.numberoflinesafter();
  }
  return [player1win, nbline]  
    

}
for(let i = range[0]; i <= range[1]; i++){
  let pw = whowin(i);
  console.log(`Pour ${i} cartes la victoire revient au joueur ${pw[0] ? "1":"2"} avec ${pw[1]} possibilités de parties (en considérant que 1 n'est joué qu'en dernier recours)`);
}
