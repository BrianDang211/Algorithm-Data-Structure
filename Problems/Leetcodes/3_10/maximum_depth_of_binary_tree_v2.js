/**
 *    Input:  [3,9,20,null,null,15,7]
 *    Output: 3 => Depth of tree
 *    
 *    Let's me tell you, how to I implement solution for this problem?
 *   
 */
const { tree } = require("../../Topic_5_Tree/tree");

tree.setTreeArray([3,9,20,null,null,15,7]);

var maxDepth = function(root) {
      if (root===undefined || root===null) return 0;
      const maxDepthOfLeftTree = 1 + maxDepth(root?.left);
      const maxDepthOfRightTree = 1 + maxDepth(root?.right);
      return maxDepthOfLeftTree > maxDepthOfRightTree ? maxDepthOfLeftTree : maxDepthOfRightTree;
};

console.log(maxDepth(tree.tree));