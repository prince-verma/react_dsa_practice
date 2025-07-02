/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    if(b === 0) return a
    const rawSum = a ^ b
    const carry = (a & b) << 1
    return getSum(rawSum, carry)

};

function count_one(n) {
    let count = 0
    while(n) {
        n = n&(n-1);
        count++;
    }
    return count;
}

// console.log("here comes -- ", count_one(7))
// console.log("here comes -- ", getSum(4, 3))
// console.log("here comes -- ", getSum(4, 3))
// console.log("here comes -- ", getSum(300000, 3))

export default getSum