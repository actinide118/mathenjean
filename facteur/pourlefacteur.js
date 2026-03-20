function get_solution(nb){
  if(nb%2!=0){
    throw new Error("Le nombre doit etre pair")
  }
  let solution=[1]
  let currnb=nb-2
  while(currnb!=2){
    solution.push(currnb)
    currnb-=2
  }
  solution.push(2)
  solution.push(nb)
  currnb=nb-1
  while(currnb!=3){
    solution.push(currnb)
    currnb-=2
  }
  solution.push(3)
  return solution
}

console.log("6 maisons: "+get_solution(6))
console.log("8 maisons: "+get_solution(8))
console.log("10 maisons: "+get_solution(10))
console.log("12 maisons: "+get_solution(12))
