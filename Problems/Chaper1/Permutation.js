/**
 * Problem: Listed all config from an array naturally
 * For example
 * Input: n
 * Ouput:
 * n = 4: {1,2,3,4}
 * 1 2 3 4
 * 1 2 4 3
 * 1 3 2 4
 * 1 3 4 2
 * 1 4 2 3
 * 1 4 3 2
 * 2 1 3 4
 * 2 1 4 3
 * 2 3 1 4
 * 2 3 4 1
 * 2 4 1 3
 * 2 4 3 1
 * 3 1 2 4
 * 3 1 4 2
 * 3 2 1 4
 * 3 2 4 1
 * 3 4 1 2
 * 3 4 2 1
 * 4 1 2 3
 * 4 1 3 2
 * 4 2 1 3
 * 4 2 3 1
 * 4 3 1 2
 * 4 3 2 1
 * 
 * Number results: n!
 * 
 * ** Calculate algo complex:
 * - Time Complex: E = O(n + n!)
 * - Space Complex: E = O()
 */
const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");

function permutation(n, arrSource) {
      let results = []; 
      if (n <= 0 && !arrSource?.length) return results;
      if (n === 1) return arrSource?.length ? arrSource : (results.push(1) && results);
      const arrNumber = arrSource?.length ? arrSource : autogenerateArrNumber(1, 1, n); // t = O(n) // s = n*4 (Byte) 
      // O(n*(n-1)*(n-2)*...2.1) = O(n!)
      // S = n*n*4 + n!*4*4
      for (let i = 0; i < arrNumber.length; i++) {
            const cloneArrNumber = [...arrNumber]; // s1 = n*4 (Byte)
            cloneArrNumber.splice(i,1);  // s1 = (n-1)*4 (Byte) (Because pointer reference to cloneArrNumber variable)
            results = [...results, ...getAllCollectOfCurrentGeneration(arrNumber[i], cloneArrNumber)];
      }
      return results;
}    

// use recursive to generate all number of an generation
function getAllCollectOfCurrentGeneration(startNumberOfGeneration, restArrNumber) {
      if (startNumberOfGeneration < 0) return []; 
      if (restArrNumber.length === 1) return [[startNumberOfGeneration,...restArrNumber]];  
      let result = []; // S = 
      // S = s1
      for (let i = 0; i < restArrNumber.length; i++) {
            const cloneRestArrNumber = [...restArrNumber];  // s1 = 4*((n-1)^2 + (n-2)^2 + (n-3)^3 + ... + 2^2 + 1)
            cloneRestArrNumber.splice(i, 1);
            const subCollects = getAllCollectOfCurrentGeneration(restArrNumber[i], cloneRestArrNumber);
            if (subCollects.length) {
                  subCollects.forEach(subCollect => result.push([startNumberOfGeneration, ...subCollect]))
            }
      }
      return result; 
}

// const result = permutation(5);

// console.log("length === , result === ",result.length, result);

module.exports = { permutation };

