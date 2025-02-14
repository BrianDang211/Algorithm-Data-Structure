function TreeNode(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
}

class Dfs {
      traves = {};
      cb_dfs;

      constructor(tree) {
            this.setTree(tree);
      }

      setDfsCallback(cb_dfs) {
            this.cb_dfs=cb_dfs;
      }

      setTraves(data) {
            if (!data) return;
            this.traves = data;
      }

      setTree(newTree) {
            if (!newTree) return;
            this.tree = newTree;
            this.setTraves({});
            if (this.cb_dfs) {
                  this.cb_dfs(newTree);
            }
      }

      // What is the depth of tree?
      // A depth of tree is max of length (length is number of nodes of that branch) follow branch left or right
      getDepthOfTree(tree) {
            if (!tree?.val) return 0;
            const depthOfLeftTree = 1 + getDepthOfTree(tree.left);
            const depthOfRightTree = 1 + getDepthOfTree(tree.right);
            return depthOfLeftTree > depthOfRightTree
                  ? depthOfLeftTree
                  : depthOfRightTree;
      }

      getTotalNodeOfTree(tree) {
            if (!tree?.val) return 0;
            return (
                  1 +
                  getTotalNodeOfTree(tree.left) +
                  getTotalNodeOfTree(tree.right)
            );
      }
}

class Tree {
      tree = null;
      constructor() {}

      setTreeArray(treeInArray) {
            if (!treeInArray?.length) return;
            this.treeInArray = treeInArray;
            this.tree = this.buildTree(1);
      }

      buildTree(rootIdx) {
            if (!this.treeInArray.length) return null;
            const root = new TreeNode(this.treeInArray[rootIdx - 1]);
            if (2 * rootIdx - 1 < this.treeInArray.length) {
                  root.left = this.buildTree(2 * rootIdx);
            }
            if (2 * rootIdx < this.treeInArray.length) {
                  root.right = this.buildTree(2 * rootIdx + 1);
            }
            return root;
      }
}

const tree = new Tree();

const dfsInstance = new Dfs(null);

module.exports = { tree, dfsInstance };
