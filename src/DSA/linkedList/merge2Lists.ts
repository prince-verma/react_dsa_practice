import { ListNode } from './linkedList'

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Create a dummy head to simplify the logic
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Merge the two lists by comparing values
    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    // Append remaining nodes from either list
    current.next = l1 || l2;
    
    return dummy.next;
}