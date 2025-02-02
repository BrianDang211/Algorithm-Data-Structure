/**
 * What is the BFS?
 * -> The BFS is BREADTH FIRST SEARCH
 *
 * Before I implement it for you, i will tell you, how to i implement it?
 * Let's me explain my idea for you
 *
 *
 *
 *
 */

const { logger } = require('../../Utils/Utils');

class BFS {
      queue = [];
      traves = {};
      visited = {};
      matrix = [];
      dictEdge = null;
      nVertice = undefined;

      constructor() {}

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

      handleVerticeNotFoundException(v) {
            if (!this.isVerticeExist(v)) {
                  throw new Error(`The vertice ${v} is not found.`);
            }
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
            // logger.info('number of vertice: ' + this.nVertice);
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

      bfs(fromVertice) {
            this.handleVerticeNotFoundException(fromVertice);
            this.visited[fromVertice] = true;
            // find all adjacents of u
            for (let j = 1; j <= this.nVertice; j++) {
                  if (
                        this.visited[j] !== true &&
                        j !== fromVertice &&
                        this.matrix[fromVertice-1][j-1] === 1
                  ) {
                        this.visited[j] = true;
                        this.queue.push({
                              vertice_name: j,
                              root_vertice_name: fromVertice,
                        });
                  }
                  if (this.queue.length) {
                        const nextVertice = this.queue[0];
                        this.queue.splice(0, 1);
                        this.traves[nextVertice.vertice_name] = nextVertice.root_vertice_name;
                        this.bfs(nextVertice.vertice_name);
                  }
            }
      }

      findPath(from, to) {
            if (!from || !to) {
                  throw new Error(
                        'The ${from} and ${to} argument are require.'
                  );
            };
            // start trave
            this.bfs(from);
            this.debug();
            // At here, I will pre-check that has actually exist a path from the from argument to the to argument
            // by check the to argument visited in the visited array
            this.handlePathNotFoundException(from, to);
            let paths = [];
            let fromVertice = from;
            let verticesCanNotMove = [];
            while (fromVertice !== to) {
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
            this.queue = [];
            this.traves = {};
            this.visited = {};
            this.matrix = [];
            this.dictEdge = null;
            this.nVervice = undefined;
            this.fromVertice = undefined;
      }

      debug() {
            console.log('Graph information after trave:');
            console.log('The edge data: ', this.dictEdge);
            console.log('The matrix: ', this.matrix);
            console.log('The queue: ', this.queue);
            console.log('The trave data: ', this.traves);
            console.log('The visited: ', this.visited);
      }
}

function test() {
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
      const bfsInstance = new BFS();
      bfsInstance.setDictEdge(dictEdge);
      bfsInstance.bfs(1);
}

test();

module.exports = { bfs: new BFS() };
