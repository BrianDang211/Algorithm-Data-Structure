/**
 * Link problem: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/?envType=study-plan-v2&envId=top-interview-150
 *
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 * Let's me implement it for you
 *       Tree                   Tree
 *          1           =>         1
 *         / \                      \
 *        2   5                      2
 *       / \   \                      \
 *      3   4   6                      3
 *                                      \
 *                                       4
 *                                        \
 *                                         5
 *                                          \
 *                                           6
 *
 * => traversal this tree by pre-oder
 *
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([1, 2, 5, 3, 4, null, 6]);

var linkedList = null;

var preOrderVisited = [];

var flatten = function (root) {
      if (!root) return;
      visitTree(root);
      linkedList = root;
      linkedList.left = null;
      linkedList.right = null;
      let tail = linkedList;
      let i = 1;
      while (i < preOrderVisited.length) {
            tail.right = preOrderVisited[i];
            tail = tail.right;
            tail.left = null;
            i++;
      }
      root.left = null;
      root.right = linkedList.right;
      console.log('root after: ', root);
      return root;
};

function visitTree(root) {
      if (root !== undefined) {
            preOrderVisited.push(root);
      }
      if (root?.left) {
            visitTree(root.left);
      }
      if (root?.right) {
            visitTree(root.right);
      }
}

// console.log('Tree before: ', tree.tree);

flatten(tree.tree);
