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
 * @return {boolean}
 * Let's me tell you how to i implement it
 */

/**
 * key => from
 * value => {to, type_of_child: "left" | "right"}
 */
let traves = {};

function dfs(u) {
      if (u?.left) {
            traves[u.left.val] = { fromParent: u.val, type_of_child: 'left' };
            dfs(u.left);
      }
      if (u?.right) {
            traves[u.right.val] = { fromParent: u.val, type_of_child: 'right' };
            dfs(u.right);
      }
}

var isValidBST = function (root) {
      return check(root, true);
};

function check(root, isRoot = false) {
      if (!root) return true;
      if (isRoot) {
            traves = {};
            dfs(root); 
            console.log('traves: ', traves);
      }
      // base case for a sub-tree
      if (
            (root?.left?.val && root?.val <= root?.left?.val) ||
            (root?.right?.val && root?.val >= root?.right?.val)
      ) {
            return false;
      }
      //check for deep tree
      if (root.val) {
            const nodeTraveInfo = traves[root.val];
            if (nodeTraveInfo) {
                  if (nodeTraveInfo.type_of_child === 'left') {
                        if (root?.right?.val >= nodeTraveInfo.fromParent) {
                              return false;
                        }
                  } else if (nodeTraveInfo.type_of_child === 'right') {
                        if (root?.left?.val <= nodeTraveInfo.fromParent) {
                              return false;
                        }
                  }
            }
      }
      return check(root?.left, false) && check(root?.right, false);
}
