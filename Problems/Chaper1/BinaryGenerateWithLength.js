/**
 * Problem: List all binary value length = n where "01" exist twice
 * Input: n - It's length of binary string (4 <= n <= 10^5)
 * Ouput: List all binary value length = n where "01" exist twice
 * 
 * For example:
 * Input:
 *  n = 4
 * Output:
 *  From {0,1} 
 *  0 1 0 1
 *  
 *  n = 5
 *  0 0 1 0 1
 *  0 1 0 0 1
 *  0 1 0 1 0
 *  1 0 1 0 1
 *  0 1 1 0 1
 *  0 1 0 1 1
 * 
 * *** Idea
 * Generate binary with position | => position = begin | middle | end
 * Idea:
 * We will allocate sequent "01" at position another: begin | middle | end
 * ...begin | [01] | ...middle | [01] | ...end
 *  
 * Replace [01] => begin
 * Replace [01] => middle
 * Replace [01] => end
 * 
 * Replace [01] => {begin, middle}
 * Replace [01] => {begin, end}
 * Replace [01] => {middle, end}
 * 
 * 
 * @param {*} position 
 */ 

const { validateParameters } = require("../../Utils/Validates");
const { binaryGeneratePrograming } = require("./GenerationBaseN");

const POSITION = {
      BEGIN: "begin",
      // MIDDLE: "middle",
      // END: "end",
      // BEGIN_MIDDLE: "begin_middle",
      // BEGIN_END: "begin_end",
      // MIDDLE_END: "middle_end"
}

const FORMATER = {
      begin: "_,0,1,0,1",
      middle: "0,1,_,0,1",
      end: "0,1,0,1,_",
      begin_middle: "_,0,1,_,0,1",
      begin_end: "_,0,1,0,1,_",
      middle_end: "0,1,_,0,1,_"
}

const BINARY_ARRAY = [0,1];

function solution(n) {
      validateParameters(n);
      if (n < 4) {
            throw Error("Number n must be greater or equal 4");
      };
      if (n === 4) return begin_format.replaceAll("_,", "").split(",").map(v => Number(v));
      const restPositionToAllocate = n-4;
      return (
            Object.keys(POSITION).reduce(
                  (memo, keyPosition) => [...memo, ...generateWithPosition(POSITION[keyPosition], restPositionToAllocate)]
            ,[])    
      );
}


function generateWithPosition(position, nRestPositionToAllocate) {
      validateParameters(nRestPositionToAllocate);
      const getRestOfResultWithPosition = () => {
            const vv = binaryGeneratePrograming(nRestPositionToAllocate, BINARY_ARRAY);
            console.log("vv ==== ", vv);
            return vv.map(element => {
                  console.log("element === ", element);
                  return resultBuilder(position, element);
            });
      }
      switch (position) {
            case POSITION.BEGIN: 
            case POSITION.MIDDLE: 
            case POSITION.END: 
                  return getRestOfResultWithPosition();
            case POSITION.BEGIN_MIDDLE: 
            case POSITION.BEGIN_END: 
            case POSITION.MIDDLE_END: 
                  return mixedGenerate(position, nRestPositionToAllocate);
            default:
                  throw Error(`Position parameter value: ${position} is invalid!`)
      }
}

function mixedGenerate(position, nRestPositionToAllocate) {
      validateParameters(nRestPositionToAllocate);
      let results = [];
      for(let i = 1; i < nRestPositionToAllocate; i++) {
            const restResults = binaryGeneratePrograming(i, BINARY_ARRAY);
            const restResultsWithRevertLength = binaryGeneratePrograming(nRestPositionToAllocate - i, BINARY_ARRAY);
            console.log(restResults);
            console.log(restResultsWithRevertLength);
            results = [
                  ...results, 
                  ...restResults.map(ee => {
                        restResultsWithRevertLength.forEach(eee => resultBuilder(position, ee, eee))
                  }), 
                  ...restResultsWithRevertLength.map(ee => {
                        restResults.forEach(eee => resultBuilder(position, ee, eee))
                  }),
            ];
      };
      console.log("mixedGenerate position === ,nRestPositionToAllocate === ", position, " ===== ", results);
      return results;
}

function restResultArrayBuilder(formater, ...restResult) {
      let count = 0;
      if (!restResult?.length) {
            throw Error("Rest result array must be length greater than 0");
      }
      console.log("restResult === ", restResult);
      return formater.replace(/_/g, function(match) {
            count++;
            if (count === 1) {
                  return restResult[0].join(",");
            } else if (count === 2) {
                  return restResult[1].join(",");
            } else {
                  return match; // not replace
            }
      }).split(",").map(v => Number(v));
}

function resultBuilder(position, ...restResult) {
      if (!restResult?.length) {
            throw Error("Rest result array must be length greater than 0");
      }
      if (!Object.values(POSITION).includes(position)) {
            throw Error(`Position parameter value: ${position} is invalid!`);
      }
      return restResultArrayBuilder(FORMATER[position], restResult);
}
  
// const results = solution(3);
// const results1 = solution(4);
// const results2 = solution(5);
const results3 = solution(6);
// const results4 = solution(7);

// console.log("results === ", results);
// console.log("results1 === ", results1);
// console.log("results2 === ", results2);
console.log("results3 === ", results3);
// console.log("results4 === ", results4);
