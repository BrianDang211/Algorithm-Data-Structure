const { DIMENSION, CHARACTER_GROUP } = require('./utils/app_constants');

function TreeNode(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
      this.next = null;
}

class TreePath {
      val = null;
      childs = [];
      pointer_to_parent = null;

      static VERTICAL_GAP_CHARACTER_DEFAULT =
            CHARACTER_GROUP.VERTICAL_LINE_CHARACTER;
      static HORIZONTAL_GAP_CHARACTER_DEFAULT = CHARACTER_GROUP.TAB_CHARACTER;
      static NEW_LINE_CHARACTER = CHARACTER_GROUP.NEW_LINE_CHARACTER;
      static VERTICAL_GAP_REPEAT_DEFAULT = 3;
      static HORIZONTAL_GAP_REPEAT_DEFAULT = 1;

      constructor(val, childs) {
            this.setVal(val);
            this.setChilds(childs);
      }

      setVal(val) {
            if (val === null || val === undefined) return;
            this.val = val;
      }

      setChilds(childs) {
            if (!childs?.length) return;
            this.childs = childs;
      }

      addChild(val) {
            if (val === null || val === undefined) return;
            const child = new TreePath(val);
            child.pointer_to_parent = this;
            this.childs.push(child);
            return child;
      }

      isExistedOnPath(val) {
            if (val === null || val === undefined) return;
            let pointer_to_parent = this.pointer_to_parent;
            while (pointer_to_parent !== null) {
                  if (val === pointer_to_parent.val) return true;
                  pointer_to_parent = pointer_to_parent.pointer_to_parent;
            }
            return false;
      }

      convertTreeToUniqueArray(isSkipVal = false) {
            let treeToArray = [];
            const root = this;
            if (root?.val === null || root.val === undefined) {
                  return treeToArray;
            }
            if (!isSkipVal) {
                  treeToArray.push(root.val);
            }
            if (root?.childs?.length) {
                  root.childs.forEach((child) => {
                        const isSkipVal =
                              treeToArray.findIndex(
                                    (val) => val === child.val
                              ) !== -1;
                        treeToArray = [
                              ...treeToArray,
                              ...child.convertTreeToUniqueArray(isSkipVal),
                        ];
                  });
            }
            return treeToArray;
      }

      drawTreePath(verticalGap = '', horizontalGap = '') {
            let root = this;
            if (!root) return;
            if (verticalGap) {
                  verticalGap = makeGap(
                        DIMENSION.VERTICAL,
                        TreePath.VERTICAL_GAP_CHARACTER_DEFAULT,
                        TreePath.VERTICAL_GAP_REPEAT_DEFAULT
                  );
            }
            if (horizontalGap) {
                  horizontalGap = makeGap(
                        DIMENSION.HORIZONTAL,
                        TreePath.HORIZONTAL_GAP_CHARACTER_DEFAULT,
                        TreePath.HORIZONTAL_GAP_REPEAT_DEFAULT
                  );
            }
            let treePathLog = root.val;
            // console.log("drawTreePath -> treePathLog -> ", treePathLog);
            const childs = root?.childs || [];
            if (childs?.length) {
                  treePathLog += `${TreePath.NEW_LINE_CHARACTER}${horizontalGap}${verticalGap}${TreePath.NEW_LINE_CHARACTER}`;
                  for (let i = 0; i < childs.length; i++) {
                        const currentChild = childs[i];
                        if (i !== 0) {
                              const previousChild = childs[i - 1];
                              const nextHorizontalGap = makeGap(
                                    DIMENSION.HORIZONTAL,
                                    this.HORIZONTAL_GAP_CHARACTER_DEFAULT,
                                    previousChild?.childs?.length ||
                                          this.HORIZONTAL_GAP_REPEAT_DEFAULT
                              );
                        }
                        treePathLog += currentChild.drawTreePath(
                              verticalGap,
                              horizontalGap
                        );
                  }
            }
            return treePathLog;
      }

      /**
       *
       * @param {*} character
       * @param {*} repeat
       * @param {*} dimension
       * @returns
       */
      static makeGap(
            dimension,
            character = '',
            repeat = 1,
            horizontalGapForEachVerticalGap = ''
      ) {
            if (dimension === null || dimension === undefined) {
                  throw new Error('The value of dimension is required.');
            }
            let gapResulting = '';
            for (let i = 0; i < repeat; i++) {
                  if (dimension === DIMENSION.VERTICAL) {
                        gapResulting += `${horizontalGapForEachVerticalGap}${character}${TreePath.NEW_LINE_CHARACTER}`;
                  } else if (dimension === DIMENSION.HORIZONTAL) {
                        gapResulting += character;
                  }
            }
            return gapResulting;
      }
}

class Dfs {
      traves = {};
      cb_dfs;

      constructor(tree) {
            this.setTree(tree);
      }

      setDfsCallback(cb_dfs) {
            this.cb_dfs = cb_dfs;
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
      // A depth of tree is max of length (length is number of nodes of that branch (left or right))
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
      travelse_type = {
            PRE_ORDER: 'pre_order',
            IN_ORDER: 'in_order',
            POST_ORDER: 'post_order',
      };
      tree = null;
      drawTreeOuputFormat = '';

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
            switch (type) {
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
                        console.log(
                              "The travelse type isn't found, check again..."
                        );
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
            if (!root) return '';
            if (root?.val !== undefined) {
                  console.log(root.val === null ? 'null' : root.val);
            }
            if (root?.left !== undefined) {
                  console.log('/   ');
                  this.draw(root.left);
            }
            if (root?.right !== undefined) {
                  console.log('\\');
                  this.draw(root.right);
            }
      }
}

const tree = new Tree();

tree.setTreeArray([1, 2, 3, 4, 5, null, 7]);

// tree.drawTree(tree.travelse_type.PRE_ORDER);

// tree.draw(tree.tree);

const dfsInstance = new Dfs(null);

module.exports = { tree, dfsInstance, TreeNode, TreePath };
