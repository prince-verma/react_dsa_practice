class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next ? next : null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addNode(val) {
    const node = new Node(val, this.head);
    this.head = node;
    this.size++;
  }
  getNode(index) {
    let head = this.head;
    let count = 1;
    while (count < index) {
      head = head.next;
      count++;
    }
    return head;
  }
  getValue(index) {
    return this.getNode(index).val;
  }

  removeNode(val) {
    let head = this.head;
    let prev = null;
    while (head !== null && head.val !== val) {
      prev = head;
      head = head.next;
    }
    if (head == null) {
      return false;
    }
    if (prev == null) {
      this.head = head.next;
    } else {
      prev.next = head.next;
    }
    this.size--;
    return true;
  }

  // using size
  getMiddleElement() {
    if (this.size <= 2) return this.head;
    const midEleIndex = Math.ceil(this.size / 2);
    let head = this.head;
    let count = 1;
    while (count !== midEleIndex) {
      head = head.next;
      count++;
    }
    return head;
  }

  // using pointers
  getMiddleElementUsingPtr() {
    if (this.size <= 2) return this.head;

    let p1 = this.head;
    let p2 = this.head;
    while (p2 !== null && p2.next !== null) {
      p1 = p1.next;
      p2 = p2.next.next;
    }
    return p1;
  }

  reverse() {
    let head = this.head;
    const newList = new LinkedList();
    while (head !== null) {
      newList.addNode(head.val);
      head = head.next;
    }
    return newList;
  }

  // using pointers o(n)
  hasCycle() {
    let slow = this.head;
    let fast = this.head.next;
    while (fast !== slow && slow) {
      slow = slow.next;
      fast = fast?.next?.next;
    }
    return fast === slow;
  }

  // using set
  getCycleNode() {
    let elements = new Set();
    let curr = this.head;
    while (!elements.has(curr)) {
      elements.add(curr);
      curr = curr.next;
    }
    return curr;
  }

  // using set
  removeCycle() {
    let elements = new Set();
    let curr = this.head;
    let prev = null;
    while (!elements.has(curr)) {
      elements.add(curr);
      prev = curr;
      curr = curr.next;
    }
    prev.next = null;
  }

  // get nth element from end
  getNthELementFromEnd(n) {
    if (n > this.size) return null;
    let curr = this.head;
    let trail = this.head;
    let count = 1;
    while (curr !== null) {
      curr = curr.next;
      if (count++ > n) {
        trail = trail.next;
      }
    }
    return trail;
  }
 
  // remove nth element from end
  removeNthELementFromEnd(n) {
    if (n > this.size) return null;
    let curr = this.head;
    let prevTrail = null
    let trail = this.head;
    let count = 1;
    while (curr !== null) {
      curr = curr.next;
      if (count++ > n) {
        prevTrail = trail
        trail = trail.next;
      }
    }
    this.size--
    prevTrail.next = trail.next
  }

  printList(message = '') {
    let head = this.head;
    let str = "";
    while (head !== null) {
      str += `${head.val} -> `;
      head = head.next;
    }
    str += "null";
    console.log(message + " - size -> ", this.size);
    console.log(message + " - elements -> ", str);
  }
}

// const list = new LinkedList();
// [1, 2, 3, 4, 5, 6].forEach((item) => {
//   list.addNode(item);
// });
// list.printList("list");
// list.removeNode(6);
// list.printList("list");
// console.log("middle element - ", list.getMiddleElementUsingPtr());

// const reverseList = list.reverse();
// reverseList.printList("reverseList");
// const lastNode = reverseList.getNode(reverseList.size);
// lastNode.next = reverseList.getNode(2);
// console.log("item at list.hasCycle --", list.hasCycle());
// console.log("item at reverseList.hasCycle --", reverseList.hasCycle());
// console.log("item at reverseList.getCycleNode --", reverseList.getCycleNode());
// reverseList.removeCycle();
// reverseList.printList("reverseList");
// console.log("2nd node from last", reverseList.getNthELementFromEnd(2))
// reverseList.removeNthELementFromEnd(2)
// reverseList.printList("reverseList");
