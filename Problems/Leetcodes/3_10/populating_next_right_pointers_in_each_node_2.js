/**
 * Link Problem: https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/?envType=study-plan-v2&envId=top-interview-150
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 * For example:
 * root = [1,2,3,4,5,null,7]
 * output = [1,#,2,3,#,4,5,7#]
 *
 *
 */

const { tree } = require('../../Topic_5_Tree/tree');

tree.setTreeArray([0,0,0,0,null,null,0,null,null,null,0]);

/**
 * With Tree, we have some concepts:
 * 1) The high of tree, it is max(level_of_tree)
 *
 * For example:
 * Root -> has level 1
 * The next child has level = The previous level + 1
 *
 *                1           1 -> NULL --- 1->null
 *               / \         / \
 *              2   3       2   3 -> NULL --- 2->3->null
 *             / \   \     / \   \
 *            4   5   7   4   5   7 -> NULL --- 4->5->null
 *
 */
/**
 * Given a binary tree with struct of Node as following:
 * struct Node {
 *    int val;
 *    Node *left;
 *    Node *right;
 *    Node *next;
 * }
 *
 * We already had a binary tree with above struct.
 *
 */
const queue = [];

function bfs(u) {
      const nodeRef = u?.nodeRef;
      const levelOfNode = u?.levelOfNode;
      if (nodeRef!== undefined) {
            if (queue.length) {
                  const nextNode = queue[0];
                  nodeRef.next =
                        nextNode?.levelOfNode !== levelOfNode
                              ? null
                              : nextNode?.nodeRef ?? null;
            }
            if (nodeRef?.left?.val !== undefined) {
                  queue.push({
                        nodeRef: nodeRef?.left,
                        levelOfNode: levelOfNode + 1,
                  });
            }
            if (nodeRef?.right?.val !== undefined) {
                  queue.push({
                        nodeRef: nodeRef?.right,
                        levelOfNode: levelOfNode + 1,
                  });
            }
      }
      if (queue.length) {
            const nextNode = queue[0];
            queue.splice(0, 1); // This one like a de-queue method
            bfs(nextNode);
      }
}

var connect = function (root) {
      bfs({ nodeRef: root, levelOfNode: 1 });
      return root;
};

connect(tree.tree);

// console.log("tree: ", tree.tree);
console.log('tree after travels: ', tree.tree);
