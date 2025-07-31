/**
 * @param {string} s
 * @return {boolean}
*/
// '(', ')', '{', '}', '[',  ']'
// Constraints:
// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

const VALID_MAPPING = {
  "(" : ")",
  "{" : "}",
  "[" : "]"
}

var isValid = function(str) {
    if(str.length === 1) return false
    const stack = []
    for(let char of str){
      if(stack[stack.length-1] === char){
        stack.pop()
      // } else if(stack[stack.length-1] === undefined) {
      //    return false
      } else {
        stack.push(VALID_MAPPING[char])
      }
    }

    return stack.length === 0
};

// const str = "()[]{}"
// const str = "[{()[]{}}]"
// const str = "[{()[]{}]}"
// const str = "([}}])"
// console.log( isValid(str))