
import { ListNode } from './linkedList'


function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let node: ListNode | null  = head
  let curr = head
  let count: number = 0
  while(curr !== null){
    curr = curr?.next || null
    count++
    if(count > n+1){
      node = node?.next || null
    }
  }
   
  if(curr === null && node === head && count === n){
    head = count === 1 ? null : (head?.next || null)
    return head
  }

  if(node){
    node.next = node?.next?.next || null
  }

  return head
}
