/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 * 
 * 
 */
var isSymmetric = function(root) {
  if (root === null) return true;
  let leftChild = root.left;
  let rightChild = root.right;
  while (leftChild) {
    if (leftChild?.val !== rightChild?.val) return false;
    leftChild = leftChild?.left;
    rightChild = rightChild?.right;
  };
};