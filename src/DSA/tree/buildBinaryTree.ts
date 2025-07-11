import { BinaryTree, TreeNode, TreeNodeOrNull } from "./binaryTreeBasics";

// https://www.geeksforgeeks.org/dsa/construct-tree-inorder-level-order-traversals/
// Input:
// in[]    = {4, 8, 10, 12, 14, 20, 22};
// level[] = {20, 8, 22, 4, 12, 10, 14};

function searchInArray<T>(
  arr: T[],
  elem: T,
  start: number,
  end: number
): number {
  for (let i = start; i <= end; i++) {
    if (arr[i] === elem) {
      return i;
    }
  }
  return -1;
}

function recurBuildTree<T>(
  inOrderMap: Map<T, number>,
  levelOrder: T[],
  start: number,
  end: number
): TreeNodeOrNull<T> {
  if (start > end) return null;
  const root = new TreeNode(levelOrder[0]);
  const divideIndex: number = inOrderMap.get(levelOrder[0]) ?? -1
  // const divideIndex: number = inOrderTraversal.indexOf(levelOrder[0])
  // const divideIndex: number = searchInArray(
  //   inOrderTraversal,
  //   levelOrder[0],
  //   start,
  //   end
  // );
  const leftTreeLevelOrder = [];
  const rightTreeLevelOrder = [];
  for (let i = 1; i < levelOrder.length; i++) {
    const indexOfInOrder: number = inOrderMap.get(levelOrder[i]) ?? -1
    // const indexOfInOrder: number = inOrderTraversal.indexOf(levelOrder[i])
    // const indexOfInOrder: number = searchInArray(
    //   inOrderTraversal,
    //   levelOrder[i],
    //   start,
    //   end
    // );
    if (indexOfInOrder > divideIndex) {
      rightTreeLevelOrder.push(levelOrder[i]);
    } else {
      leftTreeLevelOrder.push(levelOrder[i]);
    }
  }
  root.left = recurBuildTree(
    inOrderMap,
    leftTreeLevelOrder,
    start,
    divideIndex - 1
  );
  root.right = recurBuildTree(
    inOrderMap,
    rightTreeLevelOrder,
    divideIndex + 1,
    end
  );
  return root;
}

// Time Complexity: O(n^3)
// Auxiliary Space: O(n), where n is the number of nodes.
export function buildBinaryTree<T>(
  inOrderTraversal: T[],
  levelOrder: T[]
): BinaryTree<T> {
  const inOrderMap: Map<T, number> = new Map()
  inOrderTraversal.forEach((item, index) => {
    inOrderMap.set(item, index)
  })

  const rootNode = recurBuildTree(
    inOrderMap,
    levelOrder,
    0,
    inOrderTraversal.length - 1
  );
  return new BinaryTree(rootNode);
}

// const inOrder: number[] = [4, 8, 10, 12, 14, 20, 22];
// const levelOrder: number[] = [20, 8, 22, 4, 12, 10, 14];
// const inOrder: number[] = [8, 4, 9, 2, 5, 1, 6, 3, 7];
// const levelOrder: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const newTree = buildBinaryTree(inOrder, levelOrder);
// console.log("newTree - ", newTree);
// console.log(
//   "inOrderTraversalMorris - ",
//   newTree.inOrderTraversalMorris().toString()
// );
// console.log(
//   "levelOrderBFS - ",
//   newTree.levelOrderBFS().toString()
// );
