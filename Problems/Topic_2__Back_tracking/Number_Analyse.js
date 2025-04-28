const { utils } = require("../../Utils/Utils");
/**
 * Input: n E Z+ (n >= 1)
 * Ouput: List all collection where sum all elements inside collection equal n
 * 
 * For example:
 * Input:
 * target = 5
 *  
 * => [1,2,...,n]
 * Ouput:
 * 1 1 1 1 1
 * 1 1 1 2
 * 1 1 2 1 (Tracking & ignore this case)
 * 1 1 3
 * 1 2 2  
 * 1 3 1   (Tracking & ignore this case)
 * 1 4
 * 2 1 1 1 (Tracking & ignore this case)
 * 2 1 1 2 (Tracking & ignore this case)
 * 2 1 2 1 (Tracking & ignore this case)
 * 2 3
 * 5
 * =>
 * x[1] => n
 * x[2] => n-1 
 * x[3] => n-2
 * ...
 * x[k-1] => n-k-2
 * x[k] => n-k-1
 * 
 * @param {*} k 
 * @param {*} n 
 */
function numberAnalyse(n) {
      utils.validateParameters(n);
      return backTrackingProgramming(n);
}

/**
 * 
 * @param {*} n 
 * @param {*} k 
 */
/**
 * Time complex
 * 
 *  
 */

/**
 * on RAM
 * Space complex
 * ???
 *  
 */
function backTrackingProgramming(n) {
      let results = [];
      const rangeValue = utils.autogenerateArrNumber(1,1,n);
      rangeValue.forEach(i => {
            if (i < n) {
                  const subElements = backTrackingProgramming(n - i);
                  subElements.forEach(sub => {
                        const subArrayMerged = [i, ...sub];
                        const subArraySorted = subArrayMerged.sort((a,b) => a-b);
                        // add unique subArray to result
                        if(!results.find(r => String(r) === String(subArraySorted))) {
                              results.push(subArrayMerged);
                        }
                  });
            } else {
                  results.push([i]);
            }
      });
      return results;
};

const results = numberAnalyse(20);
console.log(results);

