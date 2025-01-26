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

const treeInArray = [3,9,20,null,null,15,7];

console.log("Tree in array: ", treeInArray);

function TreeNode(val, left, right) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
};

function buildTree(rootIdx) {
      if (!treeInArray.length) return null;
      const root = new TreeNode(treeInArray[rootIdx-1]);
      if(2*rootIdx-1 < treeInArray.length) {
            root.left = buildTree(2*rootIdx);
      };
      if(2*rootIdx < treeInArray.length) {
            root.right = buildTree(2*rootIdx+1);
      };
      return root;
};

const tree = buildTree(1);

var isSameTree = function(p, q) {
    if ((p===null && q === null) || (p===undefined && q===undefined)) return true;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};