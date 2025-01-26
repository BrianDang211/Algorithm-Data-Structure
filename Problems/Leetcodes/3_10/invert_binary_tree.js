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
 * @return {TreeNode}
 */
/**
 * We will talk again about this problem.
 * With this problem that means we must invert the input tree to another binary tree
 * 
 * What is the inverting a tree?
 * 
 * So the inverting a tree, it means we must swap left and right tree node position and still keep root
 * 
 * Let's me tell you how to i implement it?
 * 
 * 1) So we will use recursive to swap from bottom to top of a tree
 * 
 * 1) Swap left of tree
 * 2) Swap right of tree
 * 3) Swap two sub-tree
 * 
 * // Talk about the base-case:
 * 
 * 
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
      if (root) {
          const temp = root?.left; 
          root.left =  root?.right;
          root.right = temp;
          invertTree(root?.left);
          invertTree(root?.right);
      };
      return root;
};