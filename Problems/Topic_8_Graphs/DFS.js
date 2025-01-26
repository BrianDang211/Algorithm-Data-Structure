/**
 * What is the DFS?
 * -> The DFS is Depth First Search
 * 
 * Search path from vertice s to vertice f
 * 
 * // Graph 
 * + Indirect
 * + Direct 
 * 
 * 2 components:
 * - Vertice
 * - Edge
 * 
 * Talk about DFS problem:
 * - x -> y
 * - y -> z
 * => x -> y -> z
 * 
 * x -> y -> z 
 * 
 * Why the DFS has bridge feature?
 * 
 * How to trave a graph?
 * 
 * 1) DFS
 * 2) BFS
 * 
 * 
 */

const n_vertices = 8;

// size of matrix is n_vertice*n_vertice
const matrix = [];

const traves = [];

const dictEdge = {
      1: [2,3,4],
      2: [1,3,4],
      3: [1,2,5],
      4: [2,6],
      5: [3],
      6: [4],
      7: [8],
      8: [7]
};

const fromVertice = 1;
const toVertice = 5;

function buildMatrix() {
      for(let i=0; i<8; i++) {
            matrix[i]=[];
            const dictEdgeOfVerticeI = dictEdge[i+1];
            for(let j=0; j<8; j++) {
                  matrix[i][j] = dictEdgeOfVerticeI.findIndex(s => s===j) ? 1 : 0;
            };
      };
};

buildMatrix();

console.log(matrix);

// /**
//  * We want to find a path from a vertice to target vertice
//  */

/**
 * Input: 
 * + The u is the start vertice adjacent
 * 
 * Output:
 * + The vertice which the u can visited
 * + The path which the u vertice can trave to the toVertice (if in the problem we must find a path from fromVertice to toVertice).
 * @param {*} u 
 * 
 * 1) The first sub-problem: 
 * How can we back to the previous vertice from a vertice?
 * /**
 * 1->2
 * 
 * It's useful for get the previous vertice, because when you check the vertice 2
 * we cann't find any vertice adjacent with vertice 2, and we can back to 
 * the previous which go to vertice 2 
 * traves[2] = 1
 * 
 * u -> v => traves[v] = u;
 * 
 * 2) The two sub-problem:
 * How to we mask a vertice as visited?
 * 
 * We can use an array, it calls visited
 * 
 * visited = [];
 * visisted[u] = true;
 * 
 * 3) The three sub-problem
 * 
 * 
 * ***) The big problem:
 * How to we can find a path from a vertice to other vertice?
 *  
 * 
 */
function DFS(u) {  
      
};

DFS(fromVertice);

module.exports = { DFS };