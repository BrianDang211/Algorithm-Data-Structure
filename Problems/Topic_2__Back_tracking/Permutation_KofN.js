const { validateParameters } = require("../../Utils/Validates");
const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");
/**
 * Input: n,k E Z+
 * Ouput: All collections length = k, with element value E {1,n}
 * 
 * For example:
 * Input:
 * n = 5 => Input elements = [1,2,3,4,5]
 * k = 3
 * 
 * Ouput:   k = 4
 * 1 2 3    1 2 3 4
 * 1 2 4    1 2 3 5
 * 1 2 5    1 2 4 5
 * 1 3 4    1 3 4 5
 * 1 3 5    2 3 4 5
 * 1 4 5
 * 2 3 4
 * 2 3 5
 * 2 4 5
 * 3 4 5
 * 
 * x_1 => [1, n-k+i]
 * x_2 => [Min(x_1_[i]) + 1, n-k+i] 
 * ...
 * x[n-1] => [Min(x_[n-2][i] + 1), n-k+i]
 * x_n => [Min(x_[n-1][i]) + 1, n-k+1]
 * => 
 * x[1] => n2
 * x[2] => n-1
 * x[3] => n-2
 * ... 
 * x[k-1] => n-k-2
 * x[k] => n-k-1
 * @param {*} k 
 * @param {*} n 
 */
function permutationKofN(n,k) {
      validateParameters(n,k);
      return backTrackingProgramming(n,k, 1);
}

/**
 *
 * @param {*} n 
 * @param {*} k 
 */

function backTrackingProgramming(n,k,position,initValue=1) {
      const maxValueOfCurrentPosition = n - k + position;
      const sizeOfRange = maxValueOfCurrentPosition - initValue + 1;
      // set up base case
      if (position === k) {
            return autogenerateArrNumber(initValue, 1, sizeOfRange).map(elm => [elm]);
      }
      let results = [];
      const rangeValueAvaiableForCurrentPosition = autogenerateArrNumber(initValue, 1, sizeOfRange);
      rangeValueAvaiableForCurrentPosition.forEach(v => {
            // back tracking search for all next position then merge to results
            const collectionOfNextPostion = backTrackingProgramming(
                  n,
                  k,
                  position + 1, 
                  v + 1
            );
            results = [
                  ...results,
                  ...collectionOfNextPostion.map(element => {
                        return [v, ...element]
                  })
            ];
      })
      return results;
}

const results = permutationKofN(1,1);

console.log("results === ", results);

