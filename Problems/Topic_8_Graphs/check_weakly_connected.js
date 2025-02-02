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

const dictEdgeOfVertice = {
      1: [2],
      2: [3,4],
      3: [1],
      4: [5],
      5: [6],
      6: [2]
};

/**
 * If a graph is weakly connected type when the version 
 * undirected graph is connected graph.
 */
function checkWeaklyConnectedGraph() {
      
};

checkWeaklyConnectedGraph();