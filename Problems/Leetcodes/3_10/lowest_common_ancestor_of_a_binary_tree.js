/**
 * Link problem: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * Let's me tell you how to I implement it?
 *                      3
 *                     /  \
 *                    5    1
 *                   / \  / \
 *                  6  2  0  8
 *                    / \
 *                   7   4
 *
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

var lowestCommonAncestor = function (root, p, q) {
      if (!root || !p || !q) return;
      
};
