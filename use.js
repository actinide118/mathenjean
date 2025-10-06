const {Suite} = require("./proto1");
var AdmZip = require("adm-zip");
const {writeFileSync,mkdirSync, mkdir} = require("node:fs")
const path = require("node:path");
let zip = new AdmZip();
let len =8
let refarr = [];
function writechildren(obj, path,itt=0){
  if(obj.children !== undefined){
    obj.children.forEach(element => {
      mkdirSync(path+"/"+`[${itt}]${obj.isplayer1 ? "":"n"}${obj.number}`+`(${obj.min_max_value})`, { recursive: true });
      writechildren(element, path+"/"+`[${itt}]${obj.isplayer1 ? "":"n"}${obj.number}`+`(${obj.min_max_value})`,itt+1);
    });
  }else{
    //zip.addFile(path+"/"+obj.number+".json", Buffer.from(JSON.stringify(obj), "utf8"), "entry comment goes here");
    //zip.addFile(path+"/"+`[${itt}]${obj.isplayer1 ? "":"n"}${obj.number} (${obj.min_max_value})-> FINNISH PLAYER ${obj.finnish}\n`, Buffer.from(JSON.stringify(obj), "utf8"), "entry comment goes here")
    writeFileSync(path+"/"+`[${itt}]${obj.isplayer1 ? "":"n"}${obj.number} (${obj.min_max_value})-> FINNISH PLAYER ${obj.finnish}\n`, Buffer.from(JSON.stringify(obj), "utf8"))
  }
}
for (let i = 1; i < len+1; i++){
    refarr.push(i);
}
for (let i = 2;i <=len; i+=2){
    let line = refarr.filter((e) => e !== i);

    let s = new Suite(line,true,i);
    
    let obj = s.toObject();
    writechildren(obj, path.resolve(__dirname, `table${len}`));
    //console.log(s.toString());
    

}
//zip.writeZip( `./table${len}.zip`);
