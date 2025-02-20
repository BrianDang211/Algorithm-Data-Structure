/**
 * Link problem: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/?envType=study-plan-v2&envId=top-interview-150
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 *
 * Traversal => traversal => traversal
 *
 * From inorder and postorder array of a binary tree, we must construct binary tree again.
 *
 * For example:
 * Input:
 * in-order = [9,3,15,20,7] (left -> root -> right) (L-Ro-R),
 * post-order = [9,15,7,20,3] (left -> right -> root) (L-R-Ro)
 *
 * tree => [3,9,20,null,null,15,7]
 *         [1,2,3 ,4,  5,    ,6,7]
 *
 * i => 2*i (left)
 *    => 2*i + 1 (right)
 *
 * (pre-in-post__order) => dependency by position of root node.
 *
 * Extend this problem: we can combine two methods traversal in three methods traversal above to build original tree.
 *
 * 2A3 = 3, They are (PI, PP, IP)
 *
 * Output:
 *
 * How to built a tree?
 *
 *
 * inorder=[9,3,15,20,7] ,,, postorder=[9,15,7,20,3]
 * (L,Ro,R)              ,,, (L,R,Ro)
 *
 * root => i
 *          => left: 2*i
 *          => right: 2*i + 1
 *
 * tree=[3,9,20,null,null,15,7]
 *
 * How to build it?
 *
 *          3
 *         / \
 *        9   20
 *            / \
 *           15  7
 *
 * node (i) -> left (2*i), right (2*i+1)
 *
 *
 */
// Deep Robot
var buildTree = function (inorder, postorder) {
      if (!inorder?.length || !postorder?.length) return null;
      const tree = [];
      // If we use a loop for inorder
      // inorder = [9,3,15,20,7] (L,Ro,R), postorder = [9,15,7,20,3] (L,R,Ro)
      // inorder and postorder are two results of traversal a tree
      // => tree = [3,9,20,null,null,15,7]
      // What is logic to contruct binary tree from inorder and postorder?
      // [9,3,15,20,7] (L-Ro-R) + [9,15,7,20,3] (L-R-Ro) = [3,9,20,null,null,15,7]

      
      return tree;
};
