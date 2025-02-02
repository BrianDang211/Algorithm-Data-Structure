const bfsTestData = require('./bfs_test_data.json');
const { bfs } = require('../../BFS');
const { GRAPH_DATA_STATUS } = require('../../constants/index'); 

function main() {
      if (!bfsTestData?.length) return;
      bfsTestData.forEach((testCase) => {
            if (!testCase.skip) {
                  console.log("========================");
                  console.log("Test case ID: ", testCase.id);
                  bfs.setDictEdge(testCase.dictEdge);
                  console.log(bfs.findPath(2,5));
                  console.log("========================");
            }
      });
}

main();
