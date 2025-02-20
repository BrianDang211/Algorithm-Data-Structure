/**
 * Link problem: https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-interview-150
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
 * Let's re-talk this problem:
 *
 * A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
 * The path sum of a path is the sum of the node's values in the path.
 * Given the root of a binary tree, return the maximum path sum of any non-empty path.
 *
 *
 * /**
 * The basic idea is we will list all paths of a tree, after then we will calculate
 * sum path of these paths, compare its and return a path has maximum of sum.
 * For example, we have a tree as flowing:
 *                      -10
 *                      /  \
 *                     9    20
 *                          / \
 *                         15  7
 * List_paths = [
 *    [9,-10],[-10,20],[20,15],[20,7],
 *    [9,-10,20],[-10,20,7],[-10,20,15],[15,20,7],
 *    [9,-10,20,15],[9,-10,20,7]
 * ]
 */
//  format: key => value, the key is sum of path, the value is path

const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([-10, 9, 20, null, null, 15, 7]);

var dictPaths = {};
var travels = {};
var matrix = [];
var numberNodeOfTree = 0;
var dictEdges = {};

function buildPathId(val, typeOfChild) {
      if (!typeOfChild) {
            console.log('The type of child can not empty...');
            return;
      }
      return typeOfChild + '-' + val;
}

function dfs(u) {
      if (u?.left?.val) {
            travels[buildPathId(u.left.val, 'L')] = {
                  val: u.left.val,
                  parent_val: u.val,
            };
            dfs(u.left);
      }
      if (u?.right?.val) {
            travels[buildPathId(u.right.val, 'R')] = {
                  val: u.right.val,
                  parent_val: u.val,
            };
            dfs(u.right);
      }
}

function countNumberNodeOfTree(root, rootKey = 0) {
      if (!root) return 0;
      if (root?.val !== null && root?.val !== undefined) {
            ++numberNodeOfTree;
            dictEdges[rootKey] = {
                  value: root.val,
                  list_adjacent_vertices: [],
            };
      }
      if (root?.left) {
            countNumberNodeOfTree(root.left, numberNodeOfTree);
      }
      if (root?.right) {
            countNumberNodeOfTree(root.right, numberNodeOfTree);
      }
}

function setMatrix(root) {
      if (!root) return;
}

var maxPathSum = function (root) {
      if (!root) return 0;
      // reset all global variable for new test-case
      dictPaths = {};
      travels = {};
      numberNodeOfTree = 0;
      matrix = [];
      countNumberNodeOfTree(root);
      setMatrix(root);
      scanPath(root, [root.val]);
      // console.log('dictPaths: ', dictPaths);
      dfs(root);
      console.log('travels: ', travels);
      const allSumPaths = Object.keys(dictPaths).sort((a, b) => {
            if (a > b) return -1;
            else if (a < b) return 1;
            return 0;
      });
      return allSumPaths[0];
};

function scanPath(root, memoPath = []) {
      if (tree.checkNodeAsALeaf(root)) {
            const totalOfPath = memoPath.reduce((memoSumPath, curVal) => {
                  return memoSumPath + curVal;
            }, 0);
            if (!dictPaths[totalOfPath]) {
                  dictPaths[totalOfPath] = memoPath;
            }
      }
      if (root?.left) {
            scanPath(root.left, [...memoPath, root.left.val ?? 0]);
      }
      if (root?.right) {
            scanPath(root.right, [...memoPath, root.right.val ?? 0]);
      }
}

console.log(maxPathSum(tree.tree));
