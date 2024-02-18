const { permutation } = require("./Permutation");
const { validateParameters } = require("../../Utils/Validates");
const { autogenerateArrNumber } = require("../../Utils/GenerateNumber");
const { convertRepeatElementToArray } = require("../../Utils/Converter");
const { writeFile } = require("../../Utils/WriteFile");

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

function generationBaseN(n,k) {
      validateParameters(n, k);
      const arrNumber = autogenerateArrNumber(0, 1, n);
      let results = [];
      arrNumber.forEach(n => {
            const arrSource = [n];
            while(arrSource[arrSource.length - 1] <= arrNumber[arrNumber.length - 1]) {
                  results = [...results, ...autoGeneratePrograming(k, arrSource)];
                  arrSource.push(arrSource[arrSource.length-1] + 1);
            };
      });
      return results;
}

/**
 * 
 * @param {*} k 
 * @param {*} arrSource // Integer Number Array Sorted
 * @returns 
 */
function autoGeneratePrograming(k, arrSource) {
      validateParameters(k, arrSource);
      if (arrSource.length === 1) return [convertRepeatElementToArray(String(arrSource[0]), k)];
      if (arrSource.length === k) {
            return permutation(-1, arrSource);
      };
      if (arrSource.length === 2) return binaryGeneratePrograming(k ,arrSource);
      let results = [];
      // implement for case k > arrSource.length  
      arrSource.forEach((element, idx) => {      
            const cloneArrSource = [...arrSource];
            cloneArrSource.splice(idx, 1);
            const subGenerateCollect = autoGeneratePrograming(k-1, cloneArrSource);
            // merge subGenerateCollection to parent
            if (subGenerateCollect?.length) {
                  subGenerateCollect.forEach(subArr => results.push([element, ...subArr]));
            };
      });   
      return results;
}

function binaryGeneratePrograming(k, arrSource) {
      validateParameters(k, arrSource);
      if (arrSource?.length !== 2) {
            throw Error("Binary generation must be array source length is 2");
      }
      // init results with MINIMUM config
      let results = [[...convertRepeatElementToArray(String(arrSource[0]), k-1), arrSource[1]]];
      let lastConfigOfResults = results[results.length - 1];
      const MAXIMUM_CONFIG = [...convertRepeatElementToArray(String(arrSource[1]),k-1), arrSource[0]];
      // compare lastConfigOfResult with MAXIMUM_CONFIG
      while (lastConfigOfResults.join("") !== MAXIMUM_CONFIG.join("")) {
            for (let i = lastConfigOfResults.length - 1; i >= 0; i--) {
                  let nextConfig = [];
                  if (lastConfigOfResults[i] === arrSource[0]) {
                        nextConfig = [...lastConfigOfResults.slice(0, i), arrSource[1]];
                        // set all element after position i tobe MINIMUM_VALUE of array source.
                        if (i < lastConfigOfResults.length - 1) {
                              nextConfig = [...nextConfig, ...convertRepeatElementToArray(String(arrSource[0]),k - nextConfig.length)];
                        };
                        results.push(nextConfig);
                        break;
                  }
            }
            lastConfigOfResults = results[results.length - 1];
      }
      return results;
}

const results = generationBaseN(3,2);
//log
writeFile("GenerationBaseNOutput.txt", results);
console.log("results === ", results);
console.log("results === ", results.length);