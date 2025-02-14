/**
 * Problem Link: https://leetcode.com/problems/symmetric-tree/?envType=study-plan-v2&envId=top-interview-150
 *
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
 *
 * Wake up me at 3h am on everyday.
 *
 * Let's me tell you how to I implement it?
 * How to we can do it?
 * That means we must find coresponding position of node at right tree, and compare val of it with node at left tree
 *      1
 *     /|\
 *    2 | 2
 *   /\ | /\
 *  3  4| 4 3
 *
 *
 *
 *
 *
 */

const { tree } = require('../../Topic_5_Tree/tree');

const input = [1,2,2,3,4,4,3];
tree.setTreeArray(input);
let traves = {};

function getSymetricPath(fromPathId) {
      if (!fromPathId) return;
      return fromPathId
            .split('-')
            .map((pid) => {
                  if (pid === 'L') return 'R';
                  else if (pid === 'R') return 'L';
                  console.log(
                        `The fromPathId ${fromPathId} is not mapping, please check again...`
                  );
                  return undefined;
            })
            .join('-');
}

/**
 * A path id only include three characters `L` or `R`, `-`
 * @param {*} pid
 */

const ALL_CHARACTER_FOR_PATH_IDS = ['L', '-', 'R'];

function validatePathId(pid) {
      if (
            !pid ||
            !pid.split('-').every((c) => ALL_CHARACTER_FOR_PATH_IDS.includes(c))
      ) {
            return false;
      }
      return true;
}

function findNodeFromPathId(pid) {
      if (!validatePathId(pid)) {
            console.log(`Your path id ${pid} is not valid.`);
            return;
      }
      if (!Object.keys(traves).length) {
            console.log("Don't have travesal data to find a path.");
            return;
      }
      return traves[pid];
}

function getPathId(isNodeLeft) {
      return isNodeLeft ? 'L' : 'R';
}

function buildPathIds(parentId, isNodeLeft) {
      const currentPathId = getPathId(isNodeLeft);
      return parentId ? `${parentId}-${currentPathId}` : currentPathId;
}

function dfs(u, pid = null) {
      console.log('u?.left: ', u?.left);
      console.log('u?.right: ', u?.right);
      if (u?.left) {
            const next_pid = buildPathIds(pid, true);
            traves[next_pid] = u.left.val;
            dfs(u.left, next_pid);
      }
      if (u?.right) {
            const next_pid = buildPathIds(pid, false);
            traves[next_pid] = u.right.val;
            dfs(u.right, next_pid);
      }
}

var isSymmetric = function (root) {
      if (root?.val === null) return true;
      traves = {};
      //  console.log('root: ', root);
      dfs(root);
      //  console.log('isSymmetric traves: ', traves);
      return check(root.left);
};

function check(root, pid = 'L') {
      if (root!==null && root?.val === undefined) return true;
      const symmetricPathId = getSymetricPath(pid);
      const nodeValFromSymetricPath = findNodeFromPathId(symmetricPathId);
      if (root?.val !== nodeValFromSymetricPath) {
            return false;
      }
      return check(root?.left, `${pid}-L`) && check(root?.right, `${pid}-R`);
}

console.log('check result: ', isSymmetric(tree.tree));
