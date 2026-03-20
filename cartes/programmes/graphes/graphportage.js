const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function draw_sommet(posx,posy,name){
  ctx.fillStyle = "rgb(126, 161, 212)";
  ctx.fillRect(posx, posy, 20, 20);
  ctx.font = "15px serif";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillText(name, posx+2, posy+14);
}

function draw_edge(posx1,posy1,posx2,posy2){
  ctx.beginPath()
  ctx.moveTo(posx1+10,posy1+10)
  ctx.lineTo(posx2+10,posy2+10)
  ctx.strokeStyle = "rgb(126, 161, 212)";
  ctx.lineWidth = 2;
  ctx.stroke()
}

class Layout_place{
  constructor(){
    this.isUsed=false;
    this.Sommet=undefined;
  }
}

class Layout{
  constructor(){
    this.array=[[new Layout_place(),new Layout_place()],[new Layout_place(),new Layout_place()]]
    this.colnb=2
    this.linenb=2
  }
  add_line(nb){
    for(let i=0;i<nb;i++){
      let arr=[]
      for(let j=0;j<this.colnb;j++){
        arr.push(new Layout_place())
      }
      this.array.push(arr)
    }
    this.linenb+=nb
  }
  add_col(nb){
    for(let i=0;i<nb;i++){
      this.array.forEach(e=>e.push(new Layout_place()))
    }
    this.colnb+=nb
  }
}

draw_sommet(3,4,5)

draw_sommet(25,90,1)

draw_edge(3,4,25,90)

let layout=new Layout()
layout.add_line(2)
layout.add_col(2)
