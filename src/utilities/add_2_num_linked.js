/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const createLinkedList = (arr) => {
    let list = undefined
    arr.reverse().forEach(item => {
        list = new ListNode(item, list)
    })
    return list
}



/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let result = new ListNode(0), tempL1 = l1, tempL2 = l2, carry = 0
    let dummy = result

    while (tempL1 || tempL2 || carry){
        let total = carry;
        if(tempL1){
            total += tempL1.val
            tempL1 = tempL1.next
        }
        if(tempL2){
            total += tempL2.val
            tempL2 = tempL2.next
        }
        carry = total > 9 ? 1 : 0
        total = total % 10 
        dummy.next = new ListNode(total)
        dummy = dummy.next
    }
    return result.next
};

// let l1 = createLinkedList([2, 4, 5]);
// let l2 = createLinkedList([5, 6, 4, 9, 8, 9]);

// console.log("here comes --- ", l1, l2);
// console.log("here comes --- addTwoNumbers -- ", addTwoNumbers(l1, l2));

export default addTwoNumbers;
