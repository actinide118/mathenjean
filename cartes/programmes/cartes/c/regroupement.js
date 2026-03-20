const readline = require("node:readline");
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

let is_result=true
let first_player_win=false
let games = 0
rl.on('line', (input) => {
  if(is_result){
    if(input=="1"){
      first_player_win = true
    }
  }else{
    games+=Number(input)
  }
  console.log(`recap: victory:${first_player_win ? "joueur 1": "joueur2"}; parties:${games}`)
  is_result=!is_result
});
