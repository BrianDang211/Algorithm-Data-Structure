/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 * 
 * 
 * 
 */

/**
 * The problem:
 * - It means two trees must have the same tree structure.
 * 
 * - Let's me tell you how to i implement it?
 * 
 * 1. if(p.val !== q.val) return false
 * 
 */
const { tree } = require("../../Topic_5_Tree/tree"); 

tree.setTreeArray([3,9,20,null,null,15,7]);

var isSameTree = function(p, q) {
    if ((p===null && q === null) || (p===undefined && q===undefined)) return true;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};