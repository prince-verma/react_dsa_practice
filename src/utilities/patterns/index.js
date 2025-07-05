export function pattern1(n){
  let result = ""
  for(let i =1; i<=n; i++){
    for (let j=1; j <= n; j++){
    // for (let j=n; j >= 1; j--){
      
      // if(i===j || i+j === n+1 | i===1 || i=== n || j===1 || j===n){
      if(((i===j || i+j === n+1) && i>n/2) || j===1 || j===n){
        result += " * "
      } else {
        result += "   "
      }
    }
    result += "\n"
  }
  // console.log(result)
  return result
}
