/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode, TreeNodeOrNull } from "./binaryTreeBasics";

function isValidBSTUsingInOrder(root: TreeNodeOrNull<number> | null): boolean {
  if (!root) return true;
  const stack: TreeNode<number>[] = [];
  let curr: TreeNodeOrNull<number> = root;
  let inOrderPredecessor: number = -Infinity;
  while (stack.length || curr) {
    if (curr) {
      stack.push(curr);
      curr = curr.left;
    } else {
      const node = stack.pop()!;
      if (inOrderPredecessor >= node.data) {
        return false;
      } else {
        inOrderPredecessor = node.data;
      }
      curr = node.right;
    }
  }
  return true;
}

function isValidBST(root: TreeNodeOrNull<number> | null): boolean {
  const isValid = (
    node: TreeNodeOrNull<number>,
    left: number,
    right: number
  ): boolean => {
    if (!node) return true;
    if (node.data <= left || node.data >= right) return false;
    return (
      isValid(node.left, left, node.data) &&
      isValid(node.right, node.data, right)
    );
  };
  return isValid(root, -Infinity, Infinity);
}
