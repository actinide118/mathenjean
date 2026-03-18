class Sommet{
  constructor(name,graph){
    this.sommet=name;
    this.links=[];
    this.graph=graph
  }
  remove(){
    while(this.links.length!=0){
      this.links[0].remove()
    }
    this.graph.points.forEach((e,index)=>{
      if(e==this){
        this.graph.points.splice(index,1)
      }
    })
  }
}

class Lien{
  /**
   * 
   * @param {Sommet} point1 
   * @param {Sommet} point2 
   */
  constructor(point1,point2,graph){
    this.graph=graph
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
  remove(){
    this.point1.links.forEach((e,index)=>{
      if(e==this){
        this.point1.links.splice(index,1)
      }
    })
    this.point2.links.forEach((e,index)=>{
      if(e==this){
        this.point2.links.splice(index,1)
      }
    })
    this.graph.links.forEach((e,index)=>{
      if(e==this){
        this.graph.links.splice(index,1)
      }
    })
    delete this
    
  }
  /**
   * 
   * @param {Lien} lien1 
   * @param {Lien} lien2 
   */
  static is_same(lien1,lien2){
    if(lien1.point1.sommet==lien2.point1.sommet && lien1.point2.sommet == lien2.point2.sommet
      ||lien1.point1.sommet==lien2.point2.sommet && lien1.point2.sommet == lien2.point2.sommet
    ){
      return true
    }
    return false
  }
}

class Graph_dif{
  /**
   * 
   * @param {String} type "lien" ou "sommet"
   * @param {boolean} is_add 
   * @param {Lien|Sommet} el 
   */
  constructor(type,is_add,el){
    this.type=type
    this.is_add=is_add
    this.el=el
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
    let point=new Sommet(name,this);
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
    this.links.push(new Lien(point1,point2,this));
    return;
  }
  to_String(){
    return this.links.map((e)=>{return e.to_String()}).join("\n")
  }
  clean(){
    for(let i=0;i<this.points.length;i++){
      if(this.points[i].links.length==0){
        this.points.splice(i,1)
      }
    }
  }
  /**
   * 
   * @param {Graph} graph1 
   * @param {Graph} graph2 
   */
  static Get_pourcentage_dif(graph1,graph2){
    let elemnb1=graph1.points.length+graph1.links.length
    let elemnb2=graph2.points.length+graph2.links.length
    let nb_identique=0
    if(elemnb1>elemnb2){
      graph1.points.forEach((e)=>{
        graph2.points.forEach((el)=>{
          if(e.sommet==el.sommet){
            nb_identique++
          }
        })
      })
      graph1.links.forEach((e)=>{
        graph2.links.forEach((el)=>{
          if(Lien.is_same(e,el)){
            nb_identique++
          }
        })
      })
      return (nb_identique/elemnb1)*100
    }else{
      graph2.points.forEach((e)=>{
        graph1.points.forEach((el)=>{
          if(e.sommet==el.sommet){
            nb_identique++
          }
        })
      })
      graph2.links.forEach((e)=>{
        graph1.links.forEach((el)=>{
          if(Lien.is_same(e,el)){
            nb_identique++
          }
        })
      })
      return (nb_identique/elemnb2)*100
    }
  }
  /**
   * 
   * @param {Array<Graph_dif>} graph_difs 
   */
  static Print_graph_dif(graph_difs){
    let link_added=graph_difs.filter((e)=>{return (e.is_add&&e.type=="lien")})
    let link_removed=graph_difs.filter((e)=>{return ((!e.is_add)&&e.type=="lien")})
    let point_added=graph_difs.filter((e)=>{return (e.is_add&&e.type=="sommet")})
    let point_removed=graph_difs.filter((e)=>{return ((!e.is_add)&&e.type=="sommet")})
    return `le${point_removed.length<=1?"":"s"} point${point_removed.length<=1?"":"s"} suivant${point_removed.length<=1?"":"s"} ${point_removed.length<=1?"a":"ont"} été suprimé${point_removed.length<=1?"":"s"} : ${point_removed.map(e=>{return e.el.sommet}).join(",")}
le${point_added.length<=1?"":"s"} point${point_added.length<=1?"":"s"} suivant${point_added.length<=1?"":"s"} ${point_added.length<=1?"a":"ont"} été ajouté${point_added.length<=1?"":"s"} : ${point_added.map(e=>{return e.el.sommet}).join(",")}
le${link_removed.length<=1?"":"s"} lien${link_removed.length<=1?"":"s"} suivant${link_removed.length<=1?"":"s"} ${link_removed.length<=1?"a":"ont"} été supprimé${link_removed.length<=1?"":"s"} : ${link_removed.map(e=>{return e.el.to_String()}).join(",")}
le${link_added.length<=1?"":"s"} lien${link_added.length<=1?"":"s"} suivant${link_added.length<=1?"":"s"} ${link_added.length<=1?"a":"ont"} été ajouté${link_added.length<=1?"":"s"} : ${link_added.map(e=>{return e.el.to_String()}).join(",")}`
  }
  /**
   * 
   * @param {Graph} graph1 
   * @param {Graph} graph2 
   */

  static Get_dif_between(graph1,graph2){
    let graph1points=graph1.points.map((e)=>{return {sommet:e,hasequivalent:false}})
    let graph2points=graph2.points.map((e)=>{return {sommet:e,hasequivalent:false}})
    graph1points.forEach((e)=>{
      graph2points.forEach((el)=>{
        if(e.sommet.sommet==el.sommet.sommet){
          e.hasequivalent=true;
          el.hasequivalent=true
        }
      })
    })
    let graph1links=graph1.links.map((e)=>{return {link:e,hasequivalent:false}})
    let graph2links=graph2.links.map((e)=>{return {link:e,hasequivalent:false}})
    graph1links.forEach((e)=>{
      graph2links.forEach((el)=>{
        if(Lien.is_same(e.link,el.link)){
          e.hasequivalent=true;
          el.hasequivalent=true
        }
      })
    })
    let difs=[]
    graph1points.forEach(e=>{
      if(!e.hasequivalent){
        difs.push(new Graph_dif("sommet",false,e.sommet))
      }
    })
    graph2points.forEach(e=>{
      if(!e.hasequivalent){
        difs.push(new Graph_dif("sommet",true,e.sommet))
      }
    })
    graph1links.forEach(e=>{
      if(!e.hasequivalent){
        difs.push(new Graph_dif("lien",false,e.link))
      }
    })
    graph2links.forEach(e=>{
      if(!e.hasequivalent){
        difs.push(new Graph_dif("lien",true,e.link))
      }
    })
    return difs
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
  simplify(){
    let haschanged= false
    do{
      haschanged= false
      this.points.forEach((e)=>{
        if(e.links.length==1){
          let second;
          if(e.links[0].point1==e){
            second=e.links[0].point2
          }else{
            second=e.links[0].point1
          }
          e.remove()
          second.remove()
          haschanged=true
        }
      })
      this.clean()
    }while(haschanged)
  }
  
}

let graph = new Carte_graph(100)
graph.clean()
let graph2 = new Carte_graph(100)
graph2.simplify()
graph2.clean()

let difs=Graph.Get_dif_between(graph,graph2)
console.log(Graph.Print_graph_dif(difs))
