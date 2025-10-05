const {Suite} = require("./proto1");
let len =25
let refarr = [];
for (let i = 1; i < len+1; i++){
    refarr.push(i);
}
for (let i = 2;i <=10; i+=2){
    let line = refarr.filter((e) => e !== i);

    let s = new Suite(line,true,i);
      console.log(s.toString());
}