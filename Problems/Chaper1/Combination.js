const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");
const { validateParameters } = require("../../Utils/Validates");
function combination(n , k, autoGenArrSourceConfig) {
      /**
       * Input:
       * n = 5, k = 3 (1 <= n <= 10^5, 1 <= k <= n)
       * {1,2,3,4,5}
       * 
       * Ouput: (x1 < x2 < x3 < ... < x[k-1] < x[k])
       * {1,2,3} <-----
       * {1,2,4}
       * {1,2,5}
       * {1,3,4}
       * {1,3,5}
       * {1,4,5}
       * {2,3,4}
       * {2,3,5}
       * {3,4,5}
       * 
       * x[1]: n[0] <= x[1] <= n[n-k]
       * x[k]: (k > 1)  x[1] < x[k] <= n
       * ss = k~A~n / n!
       * Algo complex
       * Cost space & time:
       * - Time: 0((ss - 1)*(2))
       * - Memory: 
       * + Int: 1 | 4 byte
       * + String: 1 byte
      */
      validateParameters(n, k);
      if (k > n) {
            throw Error("Number k must be least or equal than n");
      };
      const { startValue = 1, rangeStep = 1 } = autoGenArrSourceConfig || {};
      const numArr = autogenerateArrNumber(startValue, rangeStep, n); // n*4 (bytes)
      const results = []; // array => [[1,2,3], [1,2,4], [1,2,5], ...]
      const FIRST_ELEMENT_MAX = numArr[n-k]; // 4 byte
      const MAX_VALUE = numArr[numArr.length - 1]; // 4 byte

      let lastConfig = results[results.length - 1] ?? [];
      let nextGenerateControl = false; // 1/8 byte

      while (lastConfig[0] === undefined || Number(lastConfig[0]) < FIRST_ELEMENT_MAX) {
            // generate start_element of each generation
            if (!results?.length) {
                  results.push(autogenerateArrNumber(startValue, rangeStep, k));
            } else if (nextGenerateControl) {
                  results.push(autogenerateArrNumber(lastConfig[0] + 1, rangeStep, k));
                  // reset next generate control
                  nextGenerateControl = false;
            } else {
                  for (let i = lastConfig.length - 1; i >= 0; i--) {
                        if (lastConfig[i] < MAX_VALUE) {
                              if (lastConfig[i] + 1 === lastConfig[i+1]) {
                                    nextGenerateControl = true;
                              } else {
                                    let nextConfig = [...lastConfig.slice(0, i), lastConfig[i] + 1];
                                    if (nextConfig.length < k) {
                                          const restOfNextConfig = autogenerateArrNumber(nextConfig[nextConfig.length-1] + 1, rangeStep, k-nextConfig.length); 
                                          nextConfig = [...nextConfig, ...restOfNextConfig];
                                    }
                                    results.push(nextConfig);
                              }
                              break;
                        }
                  }
            }
            lastConfig = results[results.length - 1];
      }
      return results;
}

// const results1 = combination(4,3, {startValue: 0,rangeStep: 1});
// const results2 = solution(5,3);
// const results3 = solution(5,4);

// console.log(results1);
// console.log(results2);
// console.log(results3);

module.exports = { combination }