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
 * We want to find a path from a vertice to target vertice
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
 * u -> v => traves[v] = u
 *
 * u -> v
 *   -> v1 -> v11, v12
 *   -> v2 -> v21, v22
 *
 * DFS(u);
 *
 * 2) The two sub-problem:
 * How to we mask a vertice as visited?
 *
 * We can use an array, it calls visited
 *
 * visited = [];
 * visited[u] = true;
 *
 * 3) The three sub-problem
 *
 *
 * ***) The big problem:
 * How to we can find a path from a vertice to other vertice?
 *
 *
 */

/**
 * Time complexity:
 * T(n) = n*n
 *
 * Space complexity:
 * S(n) = It's dependency on the data type of parameters and variables inside DFS function.
 */
const { logger } = require('../../Utils/Utils');
const { GRAPH_DATA_STATUS } = require('./constants/index');

class DFS {
      traves = {};
      visited = {};
      matrix = [];
      dictEdge = null;
      nVertice = undefined;
      graphDataStatus = GRAPH_DATA_STATUS.INCODE;

      constructor() {}

      setGraphDataStatus(status) {
            if (
                  !status ||
                  !Object.values(GRAPH_DATA_STATUS).find((s) => s === status) ||
                  this.graphDataStatus === status
            )
                  return;
            this.graphDataStatus = status;
            this.meaningFulOrBackwardGraphData();
            this.meaningFulOrBackwardVisitedData();
      }

      setDictEdge(dictEdge) {
            if (dictEdge && Object.keys(dictEdge).length) {
                  this.resetGraphData();
                  this.dictEdge = dictEdge;
                  this.setNumberOfVertice();
                  this.setMatrix();
            }
      }

      setNumberOfVertice() {
            if (!this.dictEdge || !Object.keys(this.dictEdge).length) return;
            this.nVertice = Object.keys(this.dictEdge).length;
      }

      isVerticeExist(v) {
            if (!this.dictEdge || !Object.keys(this.dictEdge).length) return;
            // check vertice already existed in dictEdge data
            const allVertices = Object.keys(this.dictEdge).map((v) =>
                  Number(v)
            );
            let isExisted = false;
            for (let i = 0; i < allVertices.length; i++) {
                  if (v === allVertices[i]) {
                        this.fromVertice = v;
                        isExisted = true;
                        break;
                  }
            }
            return isExisted;
      }

      setMatrix() {
            if (!this.dictEdge || !Object.keys(this.dictEdge).length) return;
            // logger.info("number of vertice: " + this.nVertice);
            for (let i = 0; i < this.nVertice; i++) {
                  this.matrix[i] = [];
                  const dictEdgeOfVerticeI = this.dictEdge[i + 1];
                  for (let j = 0; j < this.nVertice; j++) {
                        this.matrix[i][j] = dictEdgeOfVerticeI.find(
                              (s) => s === j + 1
                        )
                              ? 1
                              : 0;
                  }
            }
            // logger.info(this.matrix);
      }

      handleVerticeNotFoundException(v) {
            if (!this.isVerticeExist(v)) {
                  throw new Error(`The vertice ${v} is not found.`);
            }
      }

      dfs(fromVertice) {
            this.handleVerticeNotFoundException(fromVertice);
            this.visited[fromVertice] = true;
            // find all adjacents of u
            // this.debug();
            for (let j = 1; j <= this.nVertice; j++) {
                  if (
                        this.visited[j] !== true &&
                        j !== fromVertice &&
                        this.matrix[fromVertice-1][j - 1] === 1
                  ) {
                        this.visited[j] = true;
                        this.traves[j] = fromVertice;
                        this.dfs(j);
                  }
            }
      }

      handlePathNotFoundException(from, to) {
            if (!this.preCheckExistPath(to)) {
                  throw new Error(
                        `Don't exist any path from vertice ${from} to vertice ${to}`
                  );
            }
      }

      preCheckExistPath(to) {
            this.handleVerticeNotFoundException(to);
            if (!this.visited || !Object.keys(this.visited).length)
                  return false;
            return this.visited[to];
      }

      findPath(from, to) {
            if (!from || !to) {
                  throw new Error(
                        'The ${from} and ${to} argument are require.'
                  );
            }
            this.resetGraphData();
            // start trave
            this.dfs(from);
            // this.debug();
            // At here, I will pre-check that has actually exist a path from the from argument to the to argument
            // by check the to argument visited in the visited array
            this.handlePathNotFoundException(from, to);
            let paths = [];
            let fromVertice = from;
            let verticesCanNotMove = [];
            while (fromVertice !== to) {
                  // console.log('fromVertice: ', fromVertice);
                  let hasPath = false;
                  for (let _toVertice in this.traves) {
                        if (
                              !verticesCanNotMove.includes(
                                    Number(_toVertice)
                              ) &&
                              this.traves[_toVertice] === fromVertice
                        ) {
                              paths.push(fromVertice);
                              fromVertice = Number(_toVertice);
                              hasPath = true;
                              break;
                        }
                  }
                  if (!hasPath) {
                        if (!verticesCanNotMove.includes(fromVertice)) {
                              verticesCanNotMove.push(fromVertice);
                        }
                        fromVertice = paths[paths.length - 1];
                        paths.splice(paths.length-1, 1);
                  }
            }
            paths.push(to);
            return paths.join('->');
      }

      resetGraphData() {
            this.traves = {};
            this.visited = {};
      }

      meaningFulOrBackwardGraphData() {
            if (!this.traves || !Object.keys(this.traves).length) return;
            const traveDataConverted = {};
            const isMeaningFull =
                  this.graphDataStatus === GRAPH_DATA_STATUS.MEANINGFUL;
            for (let k in this.traves) {
                  traveDataConverted[
                        isMeaningFull ? Number(k) + 1 : Number(k) - 1
                  ] = isMeaningFull ? this.traves[k] + 1 : this.traves[k] - 1;
            }
            this.traves = traveDataConverted;
      }

      meaningFulOrBackwardVisitedData() {
            if (!this.visited || !Object.keys(this.visited).length) return;
            const visitedDataConverted = {};
            const isMeaningFull =
                  this.graphDataStatus === GRAPH_DATA_STATUS.MEANINGFUL;
            for (let k in this.visited) {
                  visitedDataConverted[
                        isMeaningFull ? Number(k) + 1 : Number(k) - 1
                  ] = true;
            }
            this.visited = visitedDataConverted;
      }

      debug() {
            console.log('Graph information after trave:');
            console.log('The edge data: ', this.dictEdge);
            console.log('The matrix: ', this.matrix);
            console.log('The trave data: ', this.traves);
            console.log('The visited: ', this.visited);
      }
}

function test1() {
      dictEdge = {
            1: [2, 3],
            2: [1, 3, 4],
            3: [1, 2, 5],
            4: [2, 6],
            5: [3],
            6: [4],
            7: [8],
            8: [7],
      };
      const dfsInstance = new DFS();
      dfsInstance.setDictEdge(dictEdge);
      dfsInstance.dfs(1);
}

// test1();

function test2() {
      dictEdge = {
            1: [2],
            2: [3, 4],
            3: [1],
            4: [5],
            5: [6],
            6: [2],
      };
      const dfsInstance = new DFS();
      dfsInstance.setDictEdge(dictEdge);
      dfsInstance.dfs(1);
}

test2();

module.exports = { dfs: new DFS() };
