/**
 * Link problem: https://leetcode.com/problems/binary-tree-right-side-view/?envType=study-plan-v2&envId=top-interview-150
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([1, 2, 3, null, 5, null, 4]);
let rightSideViewResults = [];
let queue = [];

function bfs(u) {
      if (!u) return;
      if (
            u.level === 1 ||
            (queue.length && u.level !== queue[0].level) ||
            (!queue.length && u.level !== 1)
      ) {
            rightSideViewResults.push(u.val);
      }
      if (u.left) {
            u.left.level = u.level + 1;
            queue.push(u.left);
      }
      if (u.right) {
            u.right.level = u.level + 1;
            queue.push(u.right);
      }
      if (queue.length) {
            const nextNode = queue[0];
            queue.splice(0, 1);
            bfs(nextNode);
      }
}

var rightSideView = function (root) {
      if (!root) return [];
      root.level = 1;
      rightSideViewResults = [];
      queue = [];
      bfs(root);
      return rightSideViewResults;
};

console.log(rightSideView(tree.tree));
