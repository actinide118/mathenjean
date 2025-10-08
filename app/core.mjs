import {Suite} from "../proto1.mjs"

export class CoreInterface {
  
  constructor(){
    this.all_suites = []
  }
  /**
   * 
   * @param {Number} nombre 
   */
  generate_suite(nombre){
    let refarr = [];
    let suite = []
    for (let i = 1; i < nombre+1; i++){
      refarr.push(i);
    }
    for (let i = 2;i <=nombre; i+=2){
      let line = refarr.filter((e) => e !== i);

      let s = new Suite(line,true,i);
    
      let obj = s.toObject();
      suite.push(obj);
    }
    this.all_suites.push(suite);
    return this.all_suites.length-1
  }
  /**
   * 
   * @param {Number} suite_id
   * @param {Array} deroulement 
   */
  get_after(suite_id,deroulement){
    if (this.all_suites[suite_id] === undefined) {
      throw new Error("Suite not found");
    }
    let suite = this.all_suites[suite_id];
    if(deroulement.length == 0){
      return suite.map(
        (e)=>{
        return {min_max_value: e.min_max_value, number: e.number, isplayer1: e.isplayer1}
      })
    }
    try{
    deroulement.forEach(
      (el)=>{
        suite.forEach((elem)=>{
          if(elem.number == el){
            suite = elem.children
          }
        })
    })
    if(suite == undefined){
      return []
    }
    return suite.map(
              (e)=>{
                return {min_max_value: e.min_max_value, number: e.number, isplayer1: e.isplayer1}
              })
    }catch(e){
      throw e
    }
  }
}

