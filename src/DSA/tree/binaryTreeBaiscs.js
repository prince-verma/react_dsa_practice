class TreeNode {
  constructor(data, left, right) {
    this.data = data;
    this.left = !left ? null : left;
    this.right = !right ? null : right;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  // DFS traversal
  // inOrder traversal LNR
  inOrderTraverse(node = this.root) {
    if (node === null) return "";
    // Left node right
    return `${this.inOrderTraverse(node.left)}${
      node.data
    } ${this.inOrderTraverse(node.right)}`;
  }

  // preOrder traversal NLR
  preOrderTraverse(node = this.root) {
    if (node === null) return "";
    // node Left right
    return `${node.data} ${this.preOrderTraverse(
      node.left
    )}${this.preOrderTraverse(node.right)}`;
  }

  // postOrder traversal LRN
  postOrderTraverse(node = this.root) {
    if (node === null) return "";
    // Left right node
    return `${this.postOrderTraverse(node.left)}${this.postOrderTraverse(
      node.right
    )}${node.data} `;
  }

  // BFS traversal -- Level order traversal
  levelOrderTraversal(node = this.root) {
    if (node === null) return "";
    node = node || this.root;
    const queue = [node];
    let result = "";
    while (queue.length > 0) {
      let curr = queue.shift();
      result += `${curr.data} `;
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }

  #levelOrderBfsRec(node, level, res) {
    if (node === null) return;
    if (!res?.[level]) res[level] = [];
    res[level].push(node.data);
    this.#levelOrderBfsRec(node.left, level + 1, res);
    this.#levelOrderBfsRec(node.right, level + 1, res);
  }

  // BFS traversal -- Level order traversal
  levelOrderBFS(node = this.root) {
    const res = [];
    this.#levelOrderBfsRec(node, 0, res);
    return res;
  }

  // BFS traversal -- Level order traversal - Spiral form - right to left to right to left
  findSpiral(node = this.root) {
    let res = [];
    this.#levelOrderBfsRec(node, 0, res)
    res = res.map((item, index) => {
      if(index % 2 === 0){
        return item.reverse()
      }
      return item
    })
    return res;
  }

  // insert data in tree
  //  traverse using BFS and find the empty place at last level
  //  by below method, the node will get insert at the empty place of any level
  insert(data) {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    const queue = [this.root];
    while (queue.length > 0) {
      const curr = queue.shift();
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
  searchBFS(val, node = this.root) {
    if (node === null) return null;
    const queue = [node];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.data === val) return curr;
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return null;
  }

  // DFS search
  //  return node if exist otherwise null
  searchDFS(val, node = this.root) {
    if (node === null) return null;
    if (node.data === val) return node;
    const leftResult = this.searchBFS(val, node.left);
    const rightResult = this.searchBFS(val, node.right);
    return leftResult || rightResult;
  }

  // find last Node (right most if available) and it's parent
  // return {node: <>, parent: <>}
  getLastNodeAndParent(node = this.root) {
    if (node === null) return { node: null, parent: null };
    let lastNode = null;
    let lastParent = null;
    const queue = [{ node, parent: null }];
    while (queue.length > 0) {
      const { node: curr, parent } = queue.shift();
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
  delete(val, node = this.root) {
    if (node === null) return false;

    const target = this.searchBFS(val);

    if (target === null) return false;

    const { node: lastNode, parent: lastParent } =
      this.getLastNodeAndParent(node);

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
  getDepth(node = this.root) {
    if (node === null) return -1;
    return Math.max(this.getDepth(node.left), this.getDepth(node.right)) + 1;
  }
  // Given a binary tree, the task is to find the maximum height of the tree.
  // The maximum height of the tree is the number of nodes in the tree from the root to the deepest node.
  height(node = this.root) {
    if (node === null) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }
}

const testTree = new BinaryTree();
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let item of arr) {
  testTree.insert(item);
}

console.log("testTree = ", testTree);
console.log("inOrderTraverse = ", testTree.inOrderTraverse());
console.log("preOrderTraverse = ", testTree.preOrderTraverse());
console.log("postOrderTraverse = ", testTree.postOrderTraverse());
console.log("levelOrderTraversal = ", testTree.levelOrderTraversal());
console.log("levelOrderBFS = ", JSON.stringify(testTree.levelOrderBFS()));
console.log("getDepth = ", testTree.getDepth());
console.log("height = ", testTree.height());
console.log("findSpiral = ", testTree.findSpiral());
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
