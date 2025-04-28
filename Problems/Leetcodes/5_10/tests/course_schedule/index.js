const test_data = require('./test-case.json');
const { canFinish } = require('../../course_schedule');

function main() {
      if (!test_data?.length) return;
      for (let i = 0; i < test_data.length; i++) {
            const testCase = test_data[i];
            if (testCase.skip) continue;
            const checkResult = canFinish(testCase.numCourses, testCase.prerequisites);
            console.log("checkResult: ", checkResult);
      }
}

main();
