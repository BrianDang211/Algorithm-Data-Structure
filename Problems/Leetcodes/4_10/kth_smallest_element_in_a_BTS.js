/**
 * Link problem: https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-interview-150
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
 * @param {number} k
 * @return {number}
 */

const { tree } = require("../../Topic_5_Tree/tree");

tree.setTreeArray([3,1,4,null,2]);

var kthSmallest = function(root, k) {
    
};

kthSmallest(tree.tree);