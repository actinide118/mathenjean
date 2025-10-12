export class Suite {
    /**
     * 
     * @param {Array} available 
     * @param {Boolean} isplayer1 
     * @param {Number} number 
     */
  constructor(available,isplayer1,number) {
      //this.available = available;
      this.isplayer1 = isplayer1;
      this.number = number;
      let possible = [];
      this.children = [];
      this.min_max_value = null;
      //if(this.number === 1) {this.finnish = (isplayer1==true ? 1:2);this.min_max_value =(isplayer1 ? 2:1);return}else{this.finnish = 0}
      available.forEach((e) => {//Vérifie pour chacune des cartes 
        if(e % number === 0) possible.push(e);  //Ajoute si le nombre est un multiple du nombre joué
        if(number% e === 0) possible.push(e);   //Ajoute si le nombre est un diviseur du nombre joué
      })
      
      possible.shift()  //Supprime le premier nombre jouable qui est forcément 1
      if(possible.length === 0) {this.finnish = (isplayer1==true ? 1:2);this.min_max_value =(isplayer1 ? 1:2);return}else{this.finnish = 0}//Si il n'y a plus aucun nombre jouable après la suppression du 1 victoire du joueur qui vient de jouer
      possible.forEach((e) => {//Test les possibilités pour tous les nombres jouables par l'adversaire
        let newavailable = available.filter((a) => a !== e);//supprime le nombre qui va être joué par l'autre joueur
        let child = new Suite(newavailable,!isplayer1,e);//créer et donc calcule la suite si l'autre joueur joue le nombre e
        this.children.push(child);//stockage du resultat
        
    })
      this.children.forEach((c) => {//cherche qui gagne
        if(this.isplayer1){
            if(c.min_max_value === 2){
                this.min_max_value = 2;//si, en étant le joueur 1 le joueur 2 a un coup pour gagner alors le nombre joué par le joueur 1 est perdant
            }
        }else{
            if(c.min_max_value === 1){
                this.min_max_value = 1;//Pareil mais pour le joueur 2
            }
        }
      })
      if(isplayer1 && this.min_max_value === null) {this.min_max_value = 1;}//Si aucune variante n'est trouvé pour que le joueur 2 gagne alors cela signifie que le joueur 1 gagne sur ce nombre
      if(!isplayer1 && this.min_max_value === null) {this.min_max_value = 2;}//Pareil mais pour le joueur 2
}
    toString(itt=0) {
        let txt = "\n"+"\t".repeat(itt);//Pour la lisibilité
        if(this.finnish !== 0) {
            txt += `${this.isplayer1 ? "":"/"/*Fais précéder les nombres joués par le joueur 2 d'un slash */}${this.number} (${this.min_max_value})-> FINNISH PLAYER ${this.finnish}\n`;
            return txt;
        }else{

        txt +=`[${itt/*numéro du tour */}]${this.isplayer1 ? "":"/"/*Fais précéder les nombres joués par le joueur 2 d'un slash */}${this.number} (${this.min_max_value})-> ${this.children.map((c) => c.toString(itt+1)).join("\n")}`;}
        if(this.children.length == 0) {
            txt += `WIN PLAYER ${this.isplayer1==true ? 1:2}\n`;
        }//Actuellement inutile
        return txt;
    }
   toObject() {
       if(this.finnish !== 0) {
           return {finnish: this.finnish, min_max_value: this.min_max_value, isplayer1: this.isplayer1, number: this.number};
       }else{
           return {children: this.children.map((c) => c.toObject()), min_max_value: this.min_max_value, isplayer1: this.isplayer1, number: this.number};
       }
   } 
}

