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
let traves={};

const ROOT_ID="Ro";
const LEFT_ID="L";
const RIGHT_ID="R";
const TYPE_OF_ROOT="root";
const TYPE_OF_LEFT="left";
const TYPE_OF_RIGHT="right";
const MINIMUM=-Infinity;
const MAXIMUM=Infinity;

function buildPathId(parentPID, isLeftChild = false) {
    return `${parentPID}-${isLeftChild ? LEFT_ID : RIGHT_ID}`;
}

function dfs(u, parentPID = ROOT_ID) {
    if (parentPID===ROOT_ID) {
        traves[parentPID] = {
            parentPID: null,
            parentVal: null,
            val: u.val,
            type: TYPE_OF_ROOT
        }
    }
    if (u?.left) {
        const nextPathID = buildPathId(parentPID, true);
        traves[nextPathID] = {
                parentPID: parentPID,
                parentVal: u.val,
                val: u.left.val,
                type: TYPE_OF_LEFT
        };
        dfs(u.left, nextPathID);
    }
    if (u?.right) {
        const nextPathID = buildPathId(parentPID, false);
        traves[nextPathID] = {
                parentPID: parentPID,
                parentVal: u.val,
                val: u.right.val,  
                type: TYPE_OF_RIGHT    
        };
        dfs(u.right, nextPathID);
    }
}

function findFarthestAncestor(pid) {
    if (!pid || !Object.keys(traves).length) return;
    const nodeInfo = traves[pid];
    if (!nodeInfo) {
        console.log(`The information of node with pid ${pid} is not found.`);
        return;
    }
    const pidToArray = pid.split("-");
    const currentTypeOfNode = pidToArray[pidToArray.length-1];
    let ancestorFarthestDiffDirection = [];
    for(let i=pidToArray.length-1; i>=0; i--) {
        if (pidToArray[i]!==ROOT_ID && pidToArray[i] !== currentTypeOfNode) {
            ancestorFarthestDiffDirection=pidToArray.splice(0,i+1);
            break;
        }
    }
    console.log("pid: ", pid);
    console.log("currentTypeOfNode: ", currentTypeOfNode);
    console.log("ancestorFarthestDiffDirection: ", ancestorFarthestDiffDirection);
    return traves[traves[ancestorFarthestDiffDirection.join('-')]?.parentPID];
};

var isValidBST = function (root) {
    traves = {};
    dfs(root);
    console.log('traves: ', traves);
    return check(root);
};

function check(root, pid=ROOT_ID, level=1) {
    if (!root) return true;
    if (!(root.val > MINIMUM && root.val < MAXIMUM)) return false;

    // base case for a sub-tree
    if (
        (root?.left?.val && root?.val <= root?.left?.val) ||
        (root?.right?.val && root?.val >= root?.right?.val)
    ) {
        return false;
    }
    if (root.val!==null && root.val!== undefined && pid && level>2) {
        const fartheseAncestorOfCurrentNode = findFarthestAncestor(pid);
        console.log('fartheseAncestorOfCurrentNode: ', fartheseAncestorOfCurrentNode);
        if (fartheseAncestorOfCurrentNode) {
            const curNodeInfo = traves[pid];
            if (curNodeInfo?.type===TYPE_OF_LEFT) {
                if (root.val <= fartheseAncestorOfCurrentNode.val) {
                    return false;
                }
            } else if (curNodeInfo?.type===TYPE_OF_RIGHT) { 
                if (root.val >= fartheseAncestorOfCurrentNode.val) {
                    return false;
                }
            }
        }
    }
    return (
        check(root?.left,buildPathId(pid, true),level+1) 
        && check(root?.right,buildPathId(pid, false),level+1)
    );
}