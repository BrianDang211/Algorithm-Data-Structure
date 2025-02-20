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
 * @return {number}
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([1, 2, 3, 4, 5, 6]);

let number_of_node = 0;

var countNodes = function (root) {
      if (!root) return 0;
      number_of_node = 0;
      solution(root);
      return number_of_node;
};

function solution(root) {
      if (root !== undefined) {
            number_of_node++;
      }
      countNodes(root.left);
      countNodes(root.right);
}
