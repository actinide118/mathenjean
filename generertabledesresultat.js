const {Suite} = require("./proto1");
let range =[5,30];
function whowin(nbcards){
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
  }
  return player1win;  
    

}
for(let i = range[0]; i <= range[1]; i++){
  let pw = whowin(i);
  console.log(`Pour ${i} cartes la victoire revient au joueur ${pw ? "1":"2"}`);
}
