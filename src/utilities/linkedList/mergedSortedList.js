import {LinkedList} from './linkedListBasics'



export function mergeSortedLinkedList(list1, list2){
  const result = new LinkedList()
  let l1 = list1.head
  let l2 = list2.head

  while(l1 !== null || l2 !== null) {
    if(l1 && l2){
      if(l1.val > l2.val){
        result.addNode(l2.val)
        l2 = l2.next
      }else{
        result.addNode(l1.val)
        l1 = l1.next
      }
    } else if(l1){
      result.addNode(l1.val)
      l1 = l1.next
    } else {
      result.addNode(l2.val)
      l2 = l2.next
    }
  }

  return result.reverse()
}

const list1 = new LinkedList();
const list2 = new LinkedList();
[6, 5, 4, 3, 2, 1].forEach((item) => {
  list1.addNode(item);
  list2.addNode(item + 3);
});
list1.printList("list1")
list2.printList("list2")

const newList = mergeSortedLinkedList(list1, list2)
newList.printList("mergedList")