"use strict"
let max = 10000;
let tab = [];
let index = 0

for(let i=2; i<=max;i++){
  tab.push(i);
}
while(index < tab.length){
  let secindex = index+1
  while (secindex<tab.length){
    if(tab[secindex]%tab[index]==0){
      tab.splice(secindex,1)
    }
    secindex++
  }
  index++;
}

console.log(tab)

for(let i=10;i<=max;i++){
  let nb_premiers_fonctionnant=tab.filter((e)=>{
    return (3*e<=i &&
    4*e>i &&
    e<i/2
  )
  })
  if(nb_premiers_fonctionnant.length>=3){
    console.log(`Pour ${i} cartes les nombres premiers: ${nb_premiers_fonctionnant.join(",")} permettent au joueur 1 de gagner`)
  }else{
    console.log(i+" =>nope")
  }
}
