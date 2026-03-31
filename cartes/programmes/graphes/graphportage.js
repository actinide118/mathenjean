let popupcontainer = document.getElementById("popup");
let zoneresult=document.getElementById("result");
let declencheur = document.getElementById("trigger")
let num_imput= document.getElementById("numinput");
let similitudes_button = document.getElementById("similitudes");
let diffs_button = document.getElementById("diffs");

let selected=[]

class Popup{
  /**
   * 
   * @param {String|HTMLElement} elem 
   */
  constructor(elem){
    if(typeof elem =="string"){
      this.element=document.createElement("div");
      this.element.innerText=elem;
      this.element.className="genericpopup";
    }else{
      this.element=elem;
    }
    popupcontainer.style.display="flex";
    popupcontainer.innerHTML="";
    Popup.add_close_button(this)
    popupcontainer.appendChild(this.element)
  }
  delete(){
    this.element=undefined;
    delete this
  }
  /**
   * 
   * @param {Popup} popup 
   */
  static add_close_button(popup){
    let close = document.createElement("button");
    close.onclick = () => {
      popupcontainer.innerHTML = "";
      popup.delete()
      popupcontainer.style.display = "none";
      let button_arr = document.getElementsByName("button");
      button_arr.forEach((el) => {
        el.style.display = "block";
      });
    };
    close.innerHTML = "Fermer";
    popupcontainer.appendChild(close);
  }
}

function add_graph(nb){
  let graphic=new Carte_graph(nb);
  graphic.clean();
  let main_container=document.createElement("div");
  main_container.className="graphcontainer";

  let title = document.createElement("a");
  title.innerText=`Graphe: ${nb}`
  title.addEventListener("click",(evt)=>{
    navigator.clipboard.writeText(graphic.to_String());
    new Popup("copié dans le presse papier");
  })

  let simplify_button = document.createElement("button");
  simplify_button.innerHTML="simplifier";
  simplify_button.addEventListener("click",(evt)=>{
    graphic.simplify()
    graphic.clean();
    simplify_button.innerHTML="simplifié"
    simplify_button.disabled=true;
  })

  let is_selected=false;

  let select_buttton=document.createElement("button");
  select_buttton.innerHTML="séléctioner";
  select_buttton.addEventListener("click",(evt)=>{
    if(!is_selected){
      selected.push(graphic);
      select_buttton.innerHTML="déséléctioner";
      is_selected=true;
    }else{
      selected.forEach((el,index)=>{
        if(el==graphic){
          selected.splice(index,1);
        }
      })
      select_buttton.innerHTML="séléctioner";
      is_selected=false;
    }
  })

  let statistiques_button = document.createElement("button");
  statistiques_button.innerHTML="statistiques";
  statistiques_button.addEventListener("click",(evt)=>{
    new Popup(`Nombres de liens: ${graphic.links.length}\nNombres de points: ${graphic.points.length}`)
  })
  let remove_button=document.createElement("button");
  remove_button.innerHTML="supprimer";
  remove_button.addEventListener("click",(evt)=>{
    zoneresult.removeChild(main_container);
  })

  main_container.appendChild(select_buttton);
  main_container.appendChild(title);
  main_container.appendChild(simplify_button);
  main_container.appendChild(statistiques_button);
  main_container.appendChild(remove_button);
  zoneresult.appendChild(main_container);
}

declencheur.addEventListener("click",(evt)=>{
  let input = num_imput.value;
  add_graph(Number(input))
})

similitudes_button.addEventListener("click",(evt)=>{
  if(selected.length != 2){
    new Popup("ERREUR: 2 graphes doivent être spécifié");
    return;
  }
  new Popup(`Pourcentage de similitude: ${Graph.Get_pourcentage_dif(selected[0],selected[1])}`)
})

diffs_button.addEventListener("click",(evt)=>{
  if(selected.length != 2){
    new Popup("ERREUR: 2 graphes doivent être spécifié");
    return;
  }
  let difs=Graph.Get_dif_between(selected[0],selected[1])
  new Popup(`Différences entre:  ${selected[0].nb}(${selected[0].simplified ? "simplifié":"non simplifié"}) et ${selected[1].nb}(${selected[1].simplified ? "simplifié":"non simplifié"})\n${Graph.Print_graph_dif(difs)}`)
})
