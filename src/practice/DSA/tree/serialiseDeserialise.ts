// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/?envType=problem-list-v2&envId=oizxjoit

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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  if (!root) return "null";
  const queue: (TreeNode | null)[] = [root];
  const res: (number | string)[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    if (node) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push("null");
    }
  }
  return res.join(",");
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (data === "null") return null;
  const bfs = data.split(",");
  const root = new TreeNode(+bfs[0]);
  const queue = [root];
  let index = 1;
  while (queue.length) {
    const node = queue.shift()!;
    if (bfs[index] !== "null") {
      node.left = new TreeNode(+bfs[index]);
      queue.push(node.left);
    }
    index++;
    if (bfs[index] !== "null") {
      node.right = new TreeNode(+bfs[index]);
      queue.push(node.right);
    }
    index++;
  }
  return root;
}
