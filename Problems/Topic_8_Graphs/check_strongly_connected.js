/**
 * What is the strongly connected graph?
 * The strongly connected graph which has every vertice pair
 * [u,v] always exist a path between them.
 * 
 * For example:
 * 
 * n=5
 * 
 * start 1,2,3,4,5
 * 
 * 
 * 
 *  
 */
const { dfs } = require("./DFS");

const dictEdgeOfVertice = {
      1: [2],
      2: [3,4],
      3: [1],
      4: [5],
      5: [6],
      6: [2]
};

dfs.setDictEdge(dictEdgeOfVertice);

dfs.dfs(3);

console.log("Visisted: ", dfs.visited);

/**
 * Strongly connected -> directed graph
 * Let's me tell you, how to i implement it?
 * 
 * Step-1: I use a loop to loop all vertice
 * Step-2: With each vertice 
 * 
 */

console.log("The matrix: ", dfs.matrix);

function checkStronglyConnectedGraph() {

};

checkStronglyConnectedGraph();