import { TreeNode, TreeNodeOrNull, BinaryTree } from "./binaryTreeBasics";

type BstTreeNode = TreeNodeOrNull<number>;

export class BinarySearchTree extends BinaryTree<number> {
  // Time Complexity: O(h) where h is height of tree
  // Best case (balanced): O(log n), Worst case (skewed): O(n)
  // Space Complexity: O(1) - iterative approach
  insert(data: number): void {
    const newNode = new TreeNode(data);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let parent: BstTreeNode = null,
      curr: BstTreeNode = this.root;
    while (curr) {
      parent = curr;
      if (data < curr.data) {
        curr = curr.left;
      } else if (data > curr.data) {
        curr = curr.right;
      } else {
        //  key exists -- do nothing
        return;
      }
    }
    if (parent) {
      if (data < parent.data) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }
  }

  // Time Complexity: O(h) where h is height of tree
  // Best case (balanced): O(log n), Worst case (skewed): O(n)
  // Space Complexity: O(1) - iterative approach
  search(value: number): BstTreeNode {
    if (!this.root) return null;

    let curr: BstTreeNode = this.root;
    while (curr) {
      if (curr.data === value) return curr;
      if (value < curr.data) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return null; // Return null instead of curr (which would be null anyway)
  }

  private getInOrderSuccessor(curr: BstTreeNode): BstTreeNode {
    if (!curr) return null;
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  private deleteNodeRecur(value: number, node: BstTreeNode): BstTreeNode {
    // Base case
    if (node === null) {
      return node;
    }

    // If data to be searched is in a subtree
    if (node.data > value) {
      node.left = this.deleteNodeRecur(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteNodeRecur(value, node.right);
    } else {
      // If root matches with the given data

      // Cases when root has 0 children or
      // only right child
      if (node.left === null) {
        return node.right;
      }

      // When root has only left child
      if (node.right === null) {
        return node.left;
      }

      // When both children are present
      let inOrderSuccessor = this.getInOrderSuccessor(node);
      if (inOrderSuccessor) {
        node.data = inOrderSuccessor.data;
        node.right = this.deleteNodeRecur(inOrderSuccessor.data, node.right);
      }
    }
    return node;
  }

  deleteValue(value: number): void {
    this.root = this.deleteNodeRecur(value, this.root);
  }

  private buildBalancedTree(
    nodes: number[],
    start: number,
    end: number
  ): BstTreeNode {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new TreeNode(nodes[mid]);

    root.left = this.buildBalancedTree(nodes, start, mid - 1);
    root.right = this.buildBalancedTree(nodes, mid + 1, end);

    return root;
  }

  balanceTree(): void {
    const inOrderTraversal: number[] = this.inOrderTraversalMorris();

    this.root = this.buildBalancedTree(
      inOrderTraversal,
      0,
      inOrderTraversal.length
    );
  }
}

// const testTree = new BinarySearchTree();
// const arr = [10, 20, 16, 4, 5, 8, 40, 21, 70, 2, 3, 1];
// // const arr = [1, 2, 3, 70];
// for (let item of arr) {
//   testTree.insert(item);
// }

// console.log("test-Tree = ", testTree);
// console.log("preOrderTraverse = ", testTree.preOrderTraverse().toString());
// console.log("inOrderTraverse = ", testTree.inOrderTraverse().toString());
// console.log("postOrderTraverse = ", testTree.postOrderTraverse().toString());
// console.log("levelOrderBFS = ", testTree.levelOrderBFS());
// console.log("search(5) = ", testTree.search(5));
// console.log("search(8) = ", testTree.search(8));
// console.log("search(65) = ", testTree.search(65));

// arr.forEach(item => {
//   console.log(`"deleteValue(${item}) = "`, testTree.deleteValue(item));
//   console.log("inOrderTraverse = ", testTree.inOrderTraverse().toString());
// })

// const arr = [1,2,3,4,5,6,7,8, 9]
// const tree1 = new BinarySearchTree()
// for(let item of arr){
//   tree1.insert(item)
// }
// console.log("test-Tree = ", tree1);
// console.log("height = ", tree1.height());
// console.log("height left = ", tree1.height(tree1.root?.left));
// console.log("height right= ", tree1.height(tree1.root?.right));
// console.log("preOrderTraverse = ", tree1.preOrderTraverse().toString());
// console.log("inOrderTraverse = ", tree1.inOrderTraverse().toString());
// tree1.balanceTree()
// console.log("test-Tree = ", tree1);
// console.log("height = ", tree1.height());
// console.log("height left = ", tree1.height(tree1.root?.left));
// console.log("height right= ", tree1.height(tree1.root?.right));
// console.log("preOrderTraverse = ", tree1.preOrderTraverse().toString());
// console.log("inOrderTraverse = ", tree1.inOrderTraverse().toString());