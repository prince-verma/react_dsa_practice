import { ListNode } from "./linkedList";
import { mergeTwoLists } from "./merge2Lists";

// below will take O(k*n)
function mergeKLists1(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  let head = lists[0];
  for (let i = 1; i < lists.length; i++) {
    head = mergeTwoLists(head, lists[i])
  }
  return head;
}

// o(n * log K)
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  return mergeListsHelper(lists, 0, lists.length);
}

function mergeListsHelper(lists: Array<ListNode | null>, start: number, end: number): ListNode | null{
  if(start === end) return lists[start]
  if(start+1 === end) return mergeTwoLists(lists[start], lists[end])

  const mid = Math.floor((start+end)/2)
  const leftMerge = mergeListsHelper(lists, start, mid)
  const rightMerge = mergeListsHelper(lists, mid+1, end)

  return mergeTwoLists(leftMerge, rightMerge)

}
