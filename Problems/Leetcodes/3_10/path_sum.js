/**
 * Link problem: https://leetcode.com/problems/path-sum/?envType=study-plan-v2&envId=top-interview-150
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);

let scan_results = [];

var hasPathSum = function (root, targetSum) {
      if (root === null || root === undefined) return false;
      scan_results = [];
      console.log('tree: ', tree.tree);
      scan(root, targetSum, 0);
      console.log('scan_results: ', scan_results);
      return scan_results.length > 0;
};

function scan(root, targetSum, totalAccumuler, paths = [], isLeaf=false) {
      if (
            isLeaf &&
            targetSum === totalAccumuler &&
            paths.length
      ) {
            scan_results.push(paths.join('->'));
      }
      if (root?.val !== null && root?.val !== undefined) {
            paths = [...paths, root.val];
            const totalAccumulerUpdate = totalAccumuler + root.val;
            if (!tree.checkNodeAsALeaf(root)) {
                  if (root.left) {
                        scan(
                              root.left,
                              targetSum,
                              totalAccumulerUpdate,
                              paths
                        );
                  }
                  if (root.right) {
                        scan(
                              root.right,
                              targetSum,
                              totalAccumulerUpdate,
                              paths
                        );
                  }
            } else {
                  scan(
                        null,
                        targetSum,
                        totalAccumuler + root.val,
                        paths,
                        true
                  );
            }
      }
      return;
}

// console.log('tree: ', tree.tree);
console.log('Has Path Sum: ', hasPathSum(tree.tree, 22));
