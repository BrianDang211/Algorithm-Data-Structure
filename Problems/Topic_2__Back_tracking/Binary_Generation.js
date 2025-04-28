const { utils } = require("../../Utils/Utils");
 
/**
 * Input: Binary Length request: Integer number => n (n > 0)
 * Ouput: List binary number
 * For example: 
 * Input => n = 3
 * Output
 * 000
 * 001
 * 010
 * 011
 * 100
 * 101
 * 110
 * 111
 * 
 * => [[0,0,0], [0,0,1], [0,1,0], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
 * @param {*} n 
 * => Total elements = 2^n
 */
function binaryGeneration(n) {
      utils.validateParameters(n);
      return backTrackingProgramming(n);
}

// Use recursive design stack to excute back tracking programming
function backTrackingProgramming(n) {
      // base case
      if (n == 1) {
            return [[0], [1]];
      }
      let results = [];
      [0,1].forEach(v => {
            const valueOfNextElement = backTrackingProgramming(n-1);
            // merge next element value to current element
            // note: result of valueOfNextElement => [[v1,v2,...,vn],[v1,v2,...,vn]]
            const mergeValue = valueOfNextElement.reduce((memo, curValue) => {
                  memo = [...memo, [v, ...curValue]];
                  return memo;
            },[]);
            results = [...results, ...mergeValue]
      })
      return results;
}

const results = binaryGeneration(5);

console.log(results);