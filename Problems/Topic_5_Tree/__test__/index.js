const test_data = require("./test-case.json");
const { TreePath } = require("../tree");

function run() {
      if (!test_data?.length) {
            console.info("No data test...");
            return;
      };
      test_data.forEach(testCase => {
            if (!testCase?.isSkip) {
                  buildTreePath(testCase);
            }
      })
};

run();