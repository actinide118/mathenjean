import readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import {CoreInterface} from"./core.mjs"

const rl = readline.createInterface({ input:stdin, output:stdout });
console.log("Tap exit at every moment to quit\n number of cards: ")

let core = new CoreInterface()
let current_suite = 0
let deroulement = []
let possibilite_de_suite = []
let current_calback = start_callback

function start_callback(input){
  console.log("Generating... This may take a long time")
  current_suite=core.generate_suite(Number(input))
  let suite = core.get_after(current_suite,[])
  possibilite_de_suite = []
  suite.forEach(element => {
    possibilite_de_suite.push(element.number)
  });
  console.log(suite.map(((e,index)=>{return `${index}-Le joueur${(e.isplayer1 ? "1":"2")} joue ${e.number} avec une victoire assurée pour le joueur${(e.min_max_value==1 ? "1":"2")}`})).join("\n"))
  console.log("select option with the number next to the propsition choose any other number to go back: ")
  current_calback=generic_callback
}

function generic_callback(input){
  
  if(possibilite_de_suite[Number(input)] == undefined){
    deroulement.pop()
  }
  deroulement.push(possibilite_de_suite[Number(input)])
  let suite = core.get_after(current_suite,deroulement)
  possibilite_de_suite = []
  suite.forEach(element => {
    possibilite_de_suite.push(element.number)
  });
  console.log(suite.map(((e,index)=>{return `${index}-Le joueur${(e.isplayer1 ? "1":"2")} joue ${e.number} avec une victoire assurée pour le joueur${(e.min_max_value==1 ? "1":"2")}`})).join("\n"))
  console.log("select option with the number next to the propsition choose any other number to go back: ")
}

rl.on("line",(input)=>{
  if(input == "close" || input == "exit"){
    console.log("terminating task")
    rl.close()
  }else{
    current_calback(input)
  }
})
