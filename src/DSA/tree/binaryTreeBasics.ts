export class TreeNode<T> {
  data: T;
  left: TreeNodeOrNull<T>;
  right: TreeNodeOrNull<T>;
  constructor(data: T, left?: TreeNodeOrNull<T>, right?: TreeNodeOrNull<T>) {
    this.data = data;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export type TreeNodeOrNull<T> = TreeNode<T> | null;

export class BinaryTree<T> {
  root: TreeNodeOrNull<T>;
  constructor(node: TreeNodeOrNull<T> = null) {
    this.root = node;
  }

  // DFS traversal
  // inOrder traversal LNR
  inOrderTraverse(node: TreeNodeOrNull<T> = this.root, result: T[] = []): T[] {
    if (node === null) return result;
    // Left node right
    node.left && this.inOrderTraverse(node.left, result);
    result.push(node.data);
    node.right && this.inOrderTraverse(node.right, result);
    return result;
  }

  // DFS traversal
  // inOrder traversal LNR - Time-complexity - O(n) / Space complexity - O(h)
  inOrderTraverseUsingStack(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];
    const result: T[] = [];
    const stack: TreeNode<T>[] = [];
    let curr: TreeNodeOrNull<T> = node;
    while (stack.length > 0 || curr) {
      if (curr) {
        stack.push(curr);
        curr = curr.left;
      } else {
        const popped = stack.pop();
        if (popped) {
          result.push(popped.data);
          curr = popped.right;
        }
      }
    }
    return result;
  }

  // to find in-order predecessor of any node,
  // if node have a left child
  //    track the right most child of of node's left child.
  // else
  //    it's the parent node
  // in below function, we are only checking the first case.
  private findInOrderPredecessor(node: TreeNode<T>): TreeNodeOrNull<T> {
    let curr: TreeNodeOrNull<T> = node.left;
    while (curr?.right && curr.right !== node) {
      curr = curr.right;
    }
    return curr;
  }
  // morris algo for in-order traversal.
  // Time-complexity - O(n) / Space complexity - O(1) (not considering the o/p array space.)
  inOrderTraversalMorris(node: TreeNodeOrNull<T> = this.root): T[] {
    if (!node) return [];
    const result: T[] = [];
    let curr: TreeNodeOrNull<T> = node;
    while (curr) {
      if (curr.left) {
        const predecessor = this.findInOrderPredecessor(curr);
        if (predecessor) {
          // if there is thread exist, then remove the thread
          if (predecessor.right) {
            predecessor.right = null;
            result.push(curr.data);
            curr = curr.right;
          } else {
            // if thread not exist, add thread for future traversal
            predecessor.right = curr;
            curr = curr.left;
          }
        }
      } else {
        result.push(curr.data);
        curr = curr.right;
      }
    }

    return result;
  }

  // preOrder traversal NLR
  preOrderTraverse(node: TreeNodeOrNull<T> = this.root, result: T[] = []): T[] {
    if (node === null) return result;
    // node Left right
    result.push(node.data);
    node.left && this.preOrderTraverse(node.left, result);
    node.right && this.preOrderTraverse(node.right, result);

    return result;
  }

  // preOrder traversal NLR
  preOrderTraverseUsingStack(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];
    const result: T[] = [];
    // const stack: TreeNodeOrNull<T>[] = [node];
    // while(stack.length > 0){
    //   const popped = stack.pop();
    //   const curr: TreeNodeOrNull<T> = popped ? popped : null
    //   if(curr){
    //     result.push(curr.data);
    //     curr.left && stack.push(curr.left)
    //     curr.right && stack.push(curr.right)
    //   }
    // }
    const stack: TreeNodeOrNull<T>[] = [node];
    let curr: TreeNodeOrNull<T> = node;
    while (curr || stack.length > 0) {
      if (curr) {
        result.push(curr.data);
        curr.right && stack.push(curr.right);
        curr = curr.left;
      } else {
        const popped = stack.pop();
        if (popped) {
          curr = popped;
        }
      }
    }
    return result;
  }

  // preOrder traversal NLR
  preOrderTraversalMorris(node: TreeNodeOrNull<T> = this.root): T[] {
    if (!node) return [];
    const result: T[] = [];
    let curr: TreeNodeOrNull<T> = node;
    while (curr) {
      if (curr.left) {
        const predecessor = this.findInOrderPredecessor(curr);
        if (predecessor) {
          // if there is thread exist, then remove the thread
          if (predecessor.right && predecessor.right === curr) {
            predecessor.right = null;
            curr = curr.right;
          } else {
            // if thread not exist, add thread for future traversal
            predecessor.right = curr;
            result.push(curr.data);
            curr = curr.left;
          }
        }
      } else {
        result.push(curr.data);
        curr = curr.right;
      }
    }

    return result;
  }

  // postOrder traversal LRN
  postOrderTraverse(
    node: TreeNodeOrNull<T> = this.root,
    result: T[] = []
  ): T[] {
    if (node === null) return result;
    // Left right node
    node.left && this.postOrderTraverse(node.left, result);
    node.right && this.postOrderTraverse(node.right, result);
    result.push(node.data);
    return result;
  }

  // postOrder traversal LRN
  postOrderTraverseUsingStack(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];
    const result: T[] = [];
    const stack: TreeNode<T>[] = [];
    let curr: TreeNodeOrNull<T> = node;
    let lastVisited: TreeNodeOrNull<T> = null;

    while (stack.length > 0 || curr) {
      if (curr) {
        stack.push(curr);
        curr = curr.left;
      } else {
        const peekNode = stack[stack.length - 1];
        // If right child exists and hasn't been processed yet
        if (peekNode.right && lastVisited !== peekNode.right) {
          curr = peekNode.right;
        } else {
          // Process the node
          result.push(peekNode.data);
          lastVisited = stack.pop()!;
        }
      }
    }
    return result;
  }

  // postOrder traversal LRN
  postOrderTraverseUsingStack2(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];
    const result: T[] = [];
    const stack: TreeNode<T>[] = [node];
    // const stack2: TreeNode<T>[] = [];

    // NRL
    while (stack.length > 0) {
      const curr = stack.pop()
      curr && result.push(curr.data)
      curr?.left && stack.push(curr.left)
      curr?.right && stack.push(curr.right)
    }

    // while(stack2.length>0){
    //   const popped =  stack2.pop();
    //   popped && result.push(popped?.data)
    // }
    return result.reverse();
  }

  private recurDiagonalLevel(node: TreeNode<T>, level: number, result: T[][]): void{

    if(!result[level]){
      result[level] = []
    }
    node && result[level].push(node?.data)
    node.left && this.recurDiagonalLevel(node.left, level+1, result)
    node.right && this.recurDiagonalLevel(node.right, level, result)
  }

  traverseDiagonal(node: TreeNodeOrNull<T> = this.root):T[][] {
    if (!node) return []

    const result: T[][] = [];

    this.recurDiagonalLevel(node, 0, result)

    return result
  }

  // BFS traversal -- Level order traversal
  levelOrderTraversal(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];
    const queue: TreeNodeOrNull<T>[] = [node];
    let result = [];
    while (queue.length > 0) {
      let curr = queue.shift();
      if (!curr) continue;
      result.push(curr.data);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }

  private levelOrderBfsRec(
    node: TreeNodeOrNull<T>,
    level: number,
    res: T[][]
  ): void {
    if (node === null) return;
    if (!res[level]) res[level] = [];
    res[level].push(node.data);
    this.levelOrderBfsRec(node.left, level + 1, res);
    this.levelOrderBfsRec(node.right, level + 1, res);
  }

  // BFS traversal -- Level order traversal
  levelOrderBFS(node: TreeNodeOrNull<T> = this.root): T[][] {
    const res: T[][] = [];
    this.levelOrderBfsRec(node, 0, res);
    return res;
  }

  // BFS traversal -- Level order traversal - Spiral form - right to left to right to left
  findSpiral(node: TreeNodeOrNull<T> = this.root): T[][] {
    let res: T[][] = [];
    this.levelOrderBfsRec(node, 0, res);
    res = res.map((item, index) => {
      if (index % 2 === 0) {
        return [...item].reverse();
      }
      return item;
    });
    return res;
  }

  reverseLevelOrderTraversal(node: TreeNodeOrNull<T> = this.root): T[] {
    if (node === null) return [];

    const stack: T[] = [];
    const queue: TreeNode<T>[] = [node];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr) {
        stack.push(curr.data);
        curr.right && queue.push(curr.right);
        curr.left && queue.push(curr.left);
      }
    }
    const res: T[] = [];
    while (stack.length > 0) {
      const val = stack.pop();
      if (val !== undefined) {
        res.push(val);
      }
    }
    return res;
  }

  // insert data in tree
  //  traverse using BFS and find the empty place at last level
  //  by below method, the node will get insert at the empty place of any level
  insert(data: T): void {
    const newNode = new TreeNode<T>(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    const queue: TreeNode<T>[] = [this.root];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (!curr) continue;
      if (curr.left) {
        queue.push(curr.left);
      } else {
        curr.left = newNode;
        break;
      }
      if (curr.right) {
        queue.push(curr.right);
      } else {
        curr.right = newNode;
        break;
      }
    }
  }

  // can search by using any kind traversal -- DFS(recursive) or BFS
  // BFS search --
  //  return node if exist otherwise null
  searchBFS(
    val: number,
    node: TreeNodeOrNull<T> = this.root
  ): TreeNodeOrNull<T> {
    if (node === null) return null;
    const queue: TreeNodeOrNull<T>[] = [node];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (!curr) continue;
      if (curr.data === val) return curr;
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return null;
  }

  // DFS search
  //  return node if exist otherwise null
  searchDFS(
    val: number,
    node: TreeNodeOrNull<T> = this.root
  ): TreeNodeOrNull<T> {
    if (node === null) return null;
    if (node.data === val) return node;
    const leftResult = this.searchDFS(val, node.left);
    if (leftResult) return leftResult;
    return this.searchDFS(val, node.right);
  }

  // find last Node (right most if available) and it's parent
  // return {node: <>, parent: <>}
  getLastNodeAndParent(node: TreeNodeOrNull<T> = this.root): {
    node: TreeNodeOrNull<T>;
    parent: TreeNodeOrNull<T>;
  } {
    if (node === null) return { node: null, parent: null };
    let lastNode: TreeNodeOrNull<T> = null;
    let lastParent: TreeNodeOrNull<T> = null;
    const queue: { node: TreeNode<T>; parent: TreeNodeOrNull<T> }[] = [
      { node, parent: null },
    ];
    while (queue.length > 0) {
      const { node: curr, parent } = queue.shift()!;
      lastNode = curr;
      lastParent = parent;
      if (curr.left) queue.push({ node: curr.left, parent: curr });
      if (curr.right) queue.push({ node: curr.right, parent: curr });
    }
    return { node: lastNode, parent: lastParent };
  }
  /**
   * Deletion in binary tree can be done in any way, but to preserve tree structure,
   * we replace the target node with last node of the tree and delete the last node from tree
   *
   * deletion will happen in below steps
   *   find the node you want to delete -- say NODE
   *   find the last node of the tree using BFS/DFS -- LAST_NODE -- will use BFS here to
   *   replace the NODE with LAST_NODE and delete LAST_NODE (set LAST_NODE's parent's left/right to null)
   *
   * If node exist
   *  delete the node (keeping left and right PTR of node as null) and return it
   * else
   *  return null
   */
  delete(val: number, node: TreeNodeOrNull<T> = this.root): boolean {
    if (node === null) return false;
    const target = this.searchBFS(val);
    if (target === null) return false;
    const { node: lastNode, parent: lastParent } =
      this.getLastNodeAndParent(node);
    if (!lastNode) return false;
    // replaces target node's data with last node's data
    target.data = lastNode.data;
    if (lastParent) {
      if (lastParent.left === lastNode) {
        lastParent.left = null;
      } else {
        lastParent.right = null;
      }
      return true;
    } else if (lastNode === this.root) {
      // tree has only 1 node which is root node.
      this.root = null;
      return true;
    } else {
      return false;
    }
  }
  // Given a binary tree, the task is to find the maximum depth of the tree.
  // The maximum depth of the tree is the number of edges in the tree from the root to the deepest node.
  getDepth(node: TreeNodeOrNull<T> = this.root): number {
    if (node === null) return -1;
    return Math.max(this.getDepth(node.left), this.getDepth(node.right)) + 1;
  }
  // Given a binary tree, the task is to find the maximum height of the tree.
  // The maximum height of the tree is the number of nodes in the tree from the root to the deepest node.
  height(node: TreeNodeOrNull<T> = this.root): number {
    if (node === null) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
}

const testTree = new BinaryTree<number>();
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let item of arr) {
  testTree.insert(item);
}

// console.log("testTree = ", testTree);
// console.log("preOrderTraverse = ", testTree.preOrderTraverse().toString());
// console.log(
//   "preOrderTraverseUsingStack = ",
//   testTree.preOrderTraverseUsingStack().toString()
// );
// console.log(
//   "preOrderTraversalMorris = ",
//   testTree.preOrderTraversalMorris().toString()
// );
// console.log("postOrderTraverse = ", testTree.postOrderTraverse().toString());
// console.log("postOrderTraverseUsingStack = ", testTree.postOrderTraverseUsingStack().toString());
// console.log("postOrderTraverseUsingStack2 = ", testTree.postOrderTraverseUsingStack2().toString());
// console.log("traverseDiagonal = ", testTree.traverseDiagonal());
// console.log("inOrderTraverse = ", testTree.inOrderTraverse().toString());
// console.log(
//   "inOrderTraverseUsingStack = ",
//   testTree.inOrderTraverseUsingStack().toString()
// );
// console.log(
//   "inOrderTraversalMorris = ",
//   testTree.inOrderTraversalMorris().toString()
// );
// console.log("levelOrderTraversal = ", testTree.levelOrderTraversal());
// console.log("levelOrderBFS = ", JSON.stringify(testTree.levelOrderBFS()));
// console.log("getDepth = ", testTree.getDepth());
// console.log("height = ", testTree.height());
// console.log("findSpiral = ", JSON.stringify(testTree.findSpiral()));
// console.log("reverseLevelOrderTraversal = ", testTree.reverseLevelOrderTraversal().toString());
// console.log("searchBFS(3) = ", testTree.searchBFS(3));
// console.log("searchBFS(9) = ", testTree.searchBFS(9));
// console.log("searchDFS(5) = ", testTree.searchDFS(5));
// console.log("searchDFS(3) = ", testTree.searchDFS(3));
// console.log("searchDFS(9) = ", testTree.searchDFS(9));
// console.log("searchDFS(9) = ", testTree.searchDFS(9));
// console.log("delete(11) = ", testTree.delete(11));
// console.log("delete(4) = ", testTree.delete(4));
// console.log("levelOrderTraversal = ", testTree.levelOrderTraversal());
// for (let item of arr) {
//   console.log(`"delete(${item}) = "`, testTree.delete(item));
//   console.log(`"height of the tree = "`, testTree.height());
//   console.log("levelOrderTraversal = ", testTree.levelOrderTraversal());
// }
