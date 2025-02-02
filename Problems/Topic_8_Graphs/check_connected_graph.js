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

const { dfs }= require("./DFS"); 

const dictEdgeOfVertice = {
      1: [2],
      2: [3,4],
      3: [1],
      4: [5],
      5: [6],
      6: [2],
      7: []
};

/**
 * Strongly connected -> directed graph
 * Let's me tell you, how to i implement it?
 */
function checkConnectedGraph(dictEdgeOfVertice) {
      if (!dictEdgeOfVertice || !Object.keys(dictEdgeOfVertice).length) return;
      dfs.setDictEdge(dictEdgeOfVertice);
      const allVertices = Object.keys(dictEdgeOfVertice);
      for(let i=1; i<=allVertices.length; i++) {
            for(let j=1; j<=allVertices.length; j++) {
                  if (i===j) continue;
                  let subPath;
                  try {
                        subPath = dfs.findPath(i,j);
                  } catch(error) {}
                  if(!subPath) {
                        return false;
                  };
            };
      };
      return true;
};

console.log("check connected graph: ");
console.log(checkConnectedGraph(dictEdgeOfVertice));

module.exports = { checkConnectedGraph };