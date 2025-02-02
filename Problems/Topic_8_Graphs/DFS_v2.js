const n_vertices = 8;

// size of matrix is n_vertice*n_vertice
const matrix = [];

const dictEdge = {
      1: [2,3],
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

// About oranigation data, I use a method it calls `list adjacent`
const stack = [];
const traves = {};
const visited = {};

function buildListAdjacent() {

};

function DFS(u) {
      visited[u] = true;
      // find all adjacents of u
      for(let j=0; j<n_vertices; j++) {
            if (visited[j]!==true && j!==u && matrix[u][j]===1) {
                  visited[j] = true;
                  stack.push(j);
            };
      };
      const toVertice = stack.pop();
      if (toVertice) {
            traves[toVertice] = u;
            DFS(toVertice);
      };
};