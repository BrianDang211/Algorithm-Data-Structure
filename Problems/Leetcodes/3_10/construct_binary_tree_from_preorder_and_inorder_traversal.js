/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
/**
 * If we construct a tree in array
 * So we have rule 
 * - At root i => left of it is 2*i and right of it is 2*i+1
 * @param {*} preorder 
 * @param {*} inorder 
 * 
 * Let's me tell you how to I implement it.
 * preorder = [3,9,20,15,7]
 * inorder = [9,3,15,20,7]
 * 
 * => tree = [3,9,20,null,null,15,7]
 * 
 * The idea for build tree is from two methods used to traversal a tree
 * 
 * We have to answer for some questions:
 * 1) How to we recognize the root node?
 * 2) How to we recognize left and right childs of root at step 1?
 * -> It is similar for all childs -> we back to the step 1 
 * 
 * Let's me tell you how to i implement it step by step?
 * 
 * Let's me thinking sometime.
 * 
 * tree
 * 
 * i =>
 *    left_node => 2*i
 *    right_node => 2*i+1
 */
var buildTree = function(preorder, inorder) {
      // we must return a tree from preorder and inorder
      const tree = [];
      
      return tree;
};

const tree = buildTree([3,9,20,15,7], [9,3,15,20,7]);

console.log(tree);