import { BinaryTree, TreeNode, TreeNodeOrNull } from "./binaryTreeBasics";

// https://www.geeksforgeeks.org/dsa/construct-tree-from-given-inorder-and-preorder-traversal/
// Input:
// inorder[] = [3, 1, 4, 0, 5, 2],
// preorder[] = [0, 1, 3, 4, 2, 5]

function recurBuildTree<T>(
  inOrderMap: Map<T, number>,
  preOrder: T[],
  preOrderCurrIndex: [number],
  start: number,
  end: number
): TreeNodeOrNull<T> {
  if (start > end) return null;
  const root = new TreeNode(preOrder[preOrderCurrIndex[0]]);
  const divideIndex: number = inOrderMap.get(preOrder[preOrderCurrIndex[0]]) ?? -1;

  preOrderCurrIndex[0]++
  
  root.left = recurBuildTree(
    inOrderMap,
    preOrder,
    preOrderCurrIndex,
    start,
    divideIndex - 1
  );
  root.right = recurBuildTree(
    inOrderMap,
    preOrder,
    preOrderCurrIndex,
    divideIndex + 1,
    end
  );
  return root;
}

// Time Complexity: O(n), where n is the number of nodes
// Space Complexity: O(n) for the hashmap + O(h) for recursion stack, where h is the height of the tree
// In worst case (skewed tree): O(n) + O(n) = O(n)
// In best case (balanced tree): O(n) + O(log n) = O(n)
export function buildBinaryTree<T>(
  inOrder: T[],
  preOrder: T[]
): BinaryTree<T> {
  const inOrderMap: Map<T, number> = new Map();
  inOrder.forEach((item, index) => {
    inOrderMap.set(item, index);
  });
  const preOrderCurrIndex :[number]= [0]
  const rootNode = recurBuildTree(
    inOrderMap,
    preOrder,
    preOrderCurrIndex,
    0,
    inOrder.length - 1
  );
  return new BinaryTree(rootNode);
}

// const inOrder: number[] = [8, 4, 9, 2, 5, 1, 6, 3, 7];
// const preOrder: number[] = [1, 2, 4, 8, 9, 5, 3, 6, 7];
// const newTree = buildBinaryTree(inOrder, preOrder);
// console.log(
//   "inOrderTraversalMorris - ",
//   newTree.inOrderTraversalMorris().toString()
// );
// console.log("preOrderTraversalMorris - ", newTree.preOrderTraversalMorris().toString());
// console.log("levelOrderBFS - ", newTree.levelOrderBFS().toString());
