/**
 * Link problem: https://leetcode.com/problems/clone-graph/?envType=study-plan-v2&envId=top-interview-150
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 *    Given a reference of a node in a connected undirected graph.
 *
 *    Return a deep copy (clone) of the graph.
 *
 *    Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 *
 *    class Node {
 *        public int val;
 *        public List<Node> neighbors;
 *    }
 *
 *
 *     Test case format:
 *
 *     For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.
 *
 *     An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
 *
 *     The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.
 */

function _Node(val, neighbors) {
     this.val = val === undefined ? 0 : val;
     this.neighbors = neighbors === undefined ? [] : neighbors;
}

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
     
};
