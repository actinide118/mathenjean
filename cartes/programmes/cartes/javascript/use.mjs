import {Suite} from "./proto1.mjs"
let len =15
let refarr = [];
for (let i = 1; i < len+1; i++){
    refarr.push(i);
}
for (let i = 2;i <=len; i+=2){
    let line = refarr.filter((e) => e !== i);

    let s = new Suite(line,true,i);
    console.log(s.toString());
    

}
