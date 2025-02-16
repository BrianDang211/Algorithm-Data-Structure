/**
 * Link problem: https://leetcode.com/problems/sum-root-to-leaf-numbers/description/?envType=study-plan-v2&envId=top-interview-150
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
 *
 *          4
 *         / \
 *        9   0
 *       / \
 *      5   1
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([1, 2, 3]);

let allNumberOfPaths = [];

var sumNumbers = function (root) {
      if (!root) return 0;
      allNumberOfPaths=[];
      dfs(root);
      console.log('allNumberOfPaths: ', allNumberOfPaths);
      return allNumberOfPaths.reduce((memo, curNumberOfPath) => {
            return memo + Number(curNumberOfPath);
      }, 0);
};

function dfs(root, numberOfPath = '') {
      if (root?.val !== null && root?.val !== undefined) {
            numberOfPath+=root.val;
            if (!tree.checkNodeAsALeaf(root)) {
                  if (root.left) {
                        dfs(root.left,numberOfPath);
                  }
                  if (root.right) {
                        dfs(root.right,numberOfPath);
                  } 
            } else if(numberOfPath){
                  allNumberOfPaths.push(numberOfPath);
            }
      }
}

console.log('tree: ', tree.tree);
console.log(sumNumbers(tree.tree));
