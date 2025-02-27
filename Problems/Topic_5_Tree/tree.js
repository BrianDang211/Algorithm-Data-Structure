function TreeNode(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
      this.next = null;
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
      travelse_type={
            PRE_ORDER: "pre_order",
            IN_ORDER: "in_order",
            POST_ORDER: "post_order"
      }
      tree = null;
      drawTreeOuputFormat="";

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

      checkNodeAsALeaf(node) {
            if (!node) return false;
            return (
                  (node.left === null || node.left === undefined) &&
                  (node.right === null || node.right === undefined)
            );
      }

      /**
       *  With format:
       *                1
       *               / \
       *              2   3
       *             / \   \
       *            4   5   7   
       * Rules:
       * - The gap between two edges is one space
       * - The gap between two childs is three spaces    
       * 
       */
      drawTree(type) {
            switch(type) {
                  case this.travelse_type.PRE_ORDER: 
                        this.travelseWithPreOrder(this.tree);
                        break;
                  case this.travelse_type.IN_ORDER:
                        this.travelseWithInOrder(this.tree);
                        break;
                  case this.travelse_type.POST_ORDER:
                        this.travelseWithPostOrder(this.tree);
                        break;
                  default:
                        console.log("The travelse type isn't found, check again...");
            }
      }

      travelseWithPreOrder(root) {
            if (root) {
                  if (root?.val !== undefined) {
                        console.log(root.val);
                  }
                  this.travelseWithPreOrder(root.left);
                  this.travelseWithPreOrder(root.right);
            }
      }

      travelseWithInOrder(root) {
            if (root) {
                  this.travelseWithInOrder(root.left);
                  if (root.val !== undefined) {
                        console.log(root.val);
                  }
                  this.travelseWithInOrder(root.right);
            }
      }

      travelseWithPostOrder(root) {
            if (root) {
                  this.travelseWithPostOrder(root.left);
                  this.travelseWithPostOrder(root.right);
                  if (root?.val !== undefined) {
                        console.log(root.val);
                  }
            }
      }

      draw(root) {
            if (!root) return "";
            if (root?.val !== undefined) {
                  console.log(root.val===null ? "null" : root.val);
            }
            if (root?.left !== undefined) {
                  console.log("/   ");
                  this.draw(root.left);
            } 
            if (root?.right !== undefined) {
                  console.log("\\");
                  this.draw(root.right);
            }
      }
}

const tree = new Tree();

tree.setTreeArray([1,2,3,4,5,null,7]);

// tree.drawTree(tree.travelse_type.PRE_ORDER);

// tree.draw(tree.tree);

console.log(
      `
            1
           / \\
          2   3
         / \\   \\
        4   5   7
      `
);

const dfsInstance = new Dfs(null);

module.exports = { tree, dfsInstance };
