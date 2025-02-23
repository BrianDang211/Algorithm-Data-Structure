/**
 * Link problem: https://leetcode.com/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-interview-150
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const dictLevel = {};

function dfs(u, level = 1) {
      if (!u) return;
      dictLevel[level] = [...(dictLevel[level] || []),u.val];
      dfs(u.left,level+1);
      dfs(u.right,level+1);
}

var levelOrder = function (root) {
      if (!root) return [];
      dictLevel = {};
      dfs(root);
      return Object.values(dictLevel);
};
