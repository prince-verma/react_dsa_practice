/**
 * 1394. Find Lucky Integer in an Array
Easy
Topics
premium lock icon
Companies
Hint
Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.

Return the largest lucky integer in the array. If there is no lucky integer return -1.

 

Example 1:

Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function(arr) {
  const obj = {}
  for( let i =0 ; i< arr.length; i++){
    obj[arr[i]] = (obj[arr[i]] ?? 0) + 1
  }
  let largest = 0
  Object.entries(obj).forEach(item => {
    console.log(item)
    if( item[0] == item[1] ){
      largest = Math.max(largest, item[1])
    }
  })
  return obj[largest] ?? -1
};

// const  arr = [2,2,2,3,3]
// const arr =  [1,2,2,3,3,3]
// console.log(findLucky(arr))