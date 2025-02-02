const dfsTestData = require('./dfs_test_data.json');
const { dfs } = require('../../DFS');
const { GRAPH_DATA_STATUS } = require('../../constants/index'); 

function main() {
      if (!dfsTestData?.length) return;
      dfsTestData.forEach((testCase) => {
            if (!testCase.skip) {
                  console.log("========================");
                  console.log("Test case ID: ", testCase.id);
                  dfs.setDictEdge(testCase.dictEdge);
                  console.log(dfs.findPath(7,5));
                  console.log("========================");
            }
      });
}

main();
