const { validateParameters } = require("../../Utils/Validates");

/**
 * Input: n E Z+ (n >= 1)
 * Ouput: List all collection where sum all elements inside collection equal n
 * 
 * For example:
 * Input:
 * target = 5
 * 
 * => [1,2,...,n-1]
 * Ouput:
 * 1 1 1 1 1
 * 1 1 1 2
 * 1 2 2
 * 1 3 1
 * 1 4
 * 2 3
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
      validateParameters(n);
      return backTrackingProgramming(n);
}

/**
 * 
 * @param {*} n 
 * @param {*} k 
 */
function backTrackingProgramming(n) {
      let results = [];
      
      return results;
}

const results = numberAnalyse(5,3);

