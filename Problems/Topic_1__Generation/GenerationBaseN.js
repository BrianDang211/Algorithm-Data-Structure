const { permutation } = require("./Permutation");
const { utils } = require("../../Utils/Utils");
const { combination } = require("./Combination");

/**
 * Problem:
 * - Write a programming to listed all element has length = k with value pick from n (0, 1, 2, ..., n-1)
 * @param Integer n 
 * @param Integer k 
 * Input: n,k both are integer numbers with condition: k > 0, 0 < n <= 10^5 (For limit space for interger number) 
 * Ouput: All collect length = k, where elements inside have value from 0 -> n-1
 * For example:
 * Input:
 * n = 2, k = 3
 * 
 * Ouput:
 * 0 0 0
 * 0 0 1
 * 0 1 0
 * 0 1 1
 * 1 0 0
 * 1 0 1
 * 1 1 0
 * 1 1 1
 * 
 * TOTAL_COLLECT = n^k
 */
  
function generationBaseN(n,k,arrayAutogenConfig={startValue: 0, rangeStep: 1}) {
      utils.validateParameters(n, k);
      let results = [];
      let i = 1;
      while(i <= n && i <= k) {
            const subCombinationOfN = combination(n, i, arrayAutogenConfig);
            // console.log("subCombinationOfN === ", subCombinationOfN);
            subCombinationOfN.forEach(element => {
                  const subResults = autoGeneratePrograming(k, element);
                  // console.log("=================================");
                  // console.log("Array Source ==== ", element);
                  // console.log("subResults ==== ", subResults);
                  // console.log("Check is equal: ", Math.pow(element.length, k) === (element?.length > 1 ? subResults.length + 2 : subResults.length));
                  // console.log("=================================");
                  results = [...results, ...subResults];
            });
            i++;
      }
      return results;
}

/**
 *    
 * @param {*} k 
 * @param {*} arrSource // Integer Number Array Sorted
 * @returns  
 */
function autoGeneratePrograming(k, arrSource) {
      utils.validateParameters(k, arrSource); 
      if (arrSource.length > k) return [];   
      if (arrSource.length === 1) return [utils.convertRepeatElementToArray(String(arrSource[0]), k)];
      if (arrSource.length === k) {
            return permutation(-1, arrSource); 
      }; 
      if (arrSource.length === 2) return binaryGeneratePrograming(k ,arrSource); 
      let results = [];
      // implement for case k > arrSource.length
      arrSource.forEach((element, idx) => {      
            let count = 1;
            while(count <= 2) {
                  const cloneArrSource = [...arrSource];
                 /**
                  *  only splice cloneArrSource when loop in twice, because each number will 
                  *  have cloneArrSource.length options, should first element for each generation 
                  *  still can duplicate for another porision.
                  */
                  if (count === 2) {
                        cloneArrSource.splice(idx, 1); 
                  } 
                  const subGenerateCollect = autoGeneratePrograming(k-1, cloneArrSource);
                  // merge subGenerateCollection to parent
                  if (subGenerateCollect?.length) {
                        subGenerateCollect.forEach(subArr => results.push([element, ...subArr]));
                  }; 
                  count++;
            } 
      });     
      return results;
}

/**
 * Array Source is a number array was sorted
 */
function binaryGeneratePrograming(k, arrSource) {
      utils.validateParameters(k, arrSource);
      if (arrSource?.length !== 2) {
            throw Error("Binary generation must be array source length is 2");
      }
      if (k === 1) {
            return [[0],[1]];
      }
      // init results with MINIMUM config
      let results = [[...utils.convertRepeatElementToArray(String(arrSource[0]), k-1), arrSource[1]]];
      let lastConfigOfResults = results[results.length - 1];
      const MAXIMUM_CONFIG = [...utils.convertRepeatElementToArray(String(arrSource[1]),k-1), arrSource[0]];
      // compare lastConfigOfResult with MAXIMUM_CONFIG
      while (lastConfigOfResults.join("") !== MAXIMUM_CONFIG.join("")) {
            for (let i = lastConfigOfResults.length - 1; i >= 0; i--) {
                  let nextConfig = [];
                  if (lastConfigOfResults[i] === arrSource[0]) {
                        nextConfig = [...lastConfigOfResults.slice(0, i), arrSource[1]];
                        // set all element after position i tobe MINIMUM_VALUE of array source.
                        if (i < lastConfigOfResults.length - 1) {
                              nextConfig = [...nextConfig, ...utils.convertRepeatElementToArray(String(arrSource[0]),k - nextConfig.length)];
                        };
                        results.push(nextConfig);
                        break;
                  }
            }
            lastConfigOfResults = results[results.length - 1];
      }
      return results;
}

const results = generationBaseN(3,4);
console.log("results === ", results);
// console.log("results === ", results.length);
module.exports = { generationBaseN, binaryGeneratePrograming , autoGeneratePrograming}