class Sommet{
  constructor(name){
    this.sommet=name;
    this.links=[];
  }
}

class Lien{
  /**
   * 
   * @param {Sommet} point1 
   * @param {Sommet} point2 
   */
  constructor(point1,point2){
    if(! point1 instanceof Sommet){
      throw new TypeError("Un point doit avoir la class sommet");
    }
    if(! point2 instanceof Sommet){
      throw new TypeError("Un point doit avoir la class sommet");
    }
    this.point1=point1;
    point1.links.push(this);
    this.point2=point2;
    point2.links.push(this);
  }
  to_String(){
    return `${this.point1.sommet}-${this.point2.sommet}`
  }
}

class Graph{
  /**
   * 
   * @param {Boolean} delete_error 
   */
  constructor(delete_error=false){
    this.delete_error=delete_error;
    this.points=[];
    this.links=[];
  }
  add_point(name){
    let point=new Sommet(name);
    this.points.push(point);
  }
  create_link(name1, name2){
    let point1;
    this.points.forEach((e)=>{
      if(e.sommet==name1){
        point1=e;
      }
    })
    if(point1== undefined){
      if(this.delete_error){
        return;
      }else{
        throw new Error(`Le sommet ${name1} n'existe pas`)
      }
    }
    let point2;
    this.points.forEach((e)=>{
      if(e.sommet==name2){
        point2=e;
      }
    })
    if(point2== undefined){
      if(this.delete_error){
        return;
      }else{
        throw new Error(`Le sommet ${name1} n'existe pas`)
      }
    }
    this.links.push(new Lien(point1,point2));
    return;
  }
  to_String(){
    return this.links.map((e)=>{return e.to_String()}).join("\n")
  }
}

class Carte_graph extends Graph{
  /**
   * 
   * @param {Number} nb 
   */
  constructor(nb){
    super()
    for (let i = 2;i<=nb;i++){
      this.add_point(i);
    }
    this.points.forEach((nb1)=>{
      this.points.forEach((nb2)=>{
        if(nb1.sommet==nb2.sommet){
          return;
        }
        if(nb1.sommet % nb2.sommet==0 || nb2.sommet% nb1.sommet==0){
          let already_exist=false;
          this.links.forEach((el)=>{
            if((el.point1.sommet==nb1.sommet && el.point2.sommet ==nb2.sommet)||(el.point1.sommet==nb2.sommet && el.point2.sommet ==nb1.sommet)){
              already_exist=true
            }
          })
          if(already_exist){
            return;
          }
          this.create_link(nb1.sommet,nb2.sommet)
        }
      })
    })
  }
}

let graph = new Carte_graph(100)
console.log(graph.to_String())

