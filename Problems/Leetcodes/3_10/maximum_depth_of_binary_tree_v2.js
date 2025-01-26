/**
 *    Input:  [3,9,20,null,null,15,7]
 *    Output: 3 => Depth of tree
 *    
 *    Let's me tell you, how to I implement solution for this problem?
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

console.log("Tree: ", tree);

var maxDepth = function(root) {
      if (root===undefined || root===null) return 0;
      const maxDepthOfLeftTree = 1 + maxDepth(root?.left);
      const maxDepthOfRightTree = 1 + maxDepth(root?.right);
      return maxDepthOfLeftTree > maxDepthOfRightTree ? maxDepthOfLeftTree : maxDepthOfRightTree;
  };

console.log(maxDepth(tree));