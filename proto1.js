class Suite {
    /**
     * 
     * @param {Array} available 
     * @param {Boolean} isplayer1 
     * @param {Number} number 
     */
  constructor(available,isplayer1,number) {
      this.available = available;
      this.isplayer1 = isplayer1;
      this.number = number;
      let possible = [];
      this.children = [];
      this.min_max_value = null;
      if(this.number === 1) {this.finnish = (isplayer1==true ? 1:2);this.min_max_value =(isplayer1 ? 2:1);return}else{this.finnish = 0}
      available.forEach((e) => {
        if(e % number === 0) possible.push(e); 
        if(number% e === 0) possible.push(e);
      })
      
      possible.shift()
      if(possible.length === 0) {this.finnish = (isplayer1==true ? 1:2);this.min_max_value =(isplayer1 ? 1:2);return}else{this.finnish = 0}
      possible.forEach((e) => {
        let newavailable = available.filter((a) => a !== e);
        let child = new Suite(newavailable,!isplayer1,e);
        this.children.push(child);
        
    })
      this.children.forEach((c) => {
        if(this.isplayer1){
            if(c.min_max_value === 2){
                this.min_max_value = 2;
                //console.log(number, available)
            }
        }else{
            if(c.min_max_value === 1){
                this.min_max_value = 1;
            }
        }
      })
      if(isplayer1 && this.min_max_value === null) {this.min_max_value = 1;}
      if(!isplayer1 && this.min_max_value === null) {this.min_max_value = 2;}
}
    toString(itt=0) {
        let txt = "\n"+"\t".repeat(itt);
        if(this.finnish !== 0) {
            txt += `${this.isplayer1 ? "":"/"}${this.number} (${this.min_max_value})-> FINNISH PLAYER ${this.finnish}\n`;
            return txt;
        }else{

        txt +=`[${itt}]${this.isplayer1 ? "":"/"}${this.number} (${this.min_max_value})-> ${this.children.map((c) => c.toString(itt+1)).join("\n")}`;}
        if(this.children.length == 0) {
            txt += `WIN PLAYER ${this.isplayer1==true ? 1:2}\n`;
        }
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

module.exports.Suite = Suite;
