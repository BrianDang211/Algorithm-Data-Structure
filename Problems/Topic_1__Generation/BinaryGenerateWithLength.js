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
 * We need excute algo for 7 cases likes this:
 * 
 * Case 1: Replace [01] => begin
 * Case 2: Replace [01] => middle
 * Case 3: Replace [01] => end
 * 
 * Case 4: Replace [01] => {begin, middle}
 * Case 5: Replace [01] => {begin, end}
 * Case 6: Replace [01] => {middle, end}
 * Case 7: Replace [01] => {begin, middle, end}
 * 
 * 
 * @param {*} position 
 */ 

const { utils } = require("../../Utils/Utils");
const { writeFile } = require("../../Utils/WriteFile");
const { binaryGeneratePrograming, generationBaseN } = require("./GenerationBaseN");

const POSITION = {
      BEGIN: "begin",
      MIDDLE: "middle",
      END: "end",
      BEGIN_MIDDLE: "begin_middle",
      BEGIN_END: "begin_end",
      MIDDLE_END: "middle_end",
      BEGIN_MIDDLE_END: "begin_middle_end"
}

const FORMATER = {
      begin: "_,0,1,0,1",
      middle: "0,1,_,0,1",
      end: "0,1,0,1,_",
      begin_middle: "_,0,1,_,0,1",
      begin_end: "_,0,1,0,1,_",
      middle_end: "0,1,_,0,1,_",
      begin_middle_end: "_,0,1,_,0,1,_"
}

const BINARY_ARRAY = [0,1];

function solution(n) {
      utils.validateParameters(n);
      if (n < 4) {
            throw Error("Number n must be greater or equal 4");
      };
      if (n === 4) return FORMATER.begin.replaceAll("_,", "").split(",").map(v => Number(v));
      const restPositionToAllocate = n - 4;
      return (
            Object.keys(POSITION).reduce(
                  (memo, keyPosition) => {
                        return [...memo, ...generateWithPosition(POSITION[keyPosition], restPositionToAllocate)];
                  }
            ,[])    
      );
}

function filterResultFromBinaryGenerate(binaryGenerateArr) {
      return binaryGenerateArr.filter(vvv => !vvv.join(",").includes("0,1"));
}

function generateWithPosition(position, nRestPositionToAllocate) {
      utils.validateParameters(nRestPositionToAllocate);
      const getRestOfResultWithPosition = () => {
            const vv = binaryGeneratePrograming(nRestPositionToAllocate, BINARY_ARRAY);
            return filterResultFromBinaryGenerate(vv).map(element => {
                  return resultBuilder(position, element);
            });
      };
      switch (position) {
            case POSITION.BEGIN: 
            case POSITION.MIDDLE: 
            case POSITION.END: 
                  return getRestOfResultWithPosition();
            case POSITION.BEGIN_MIDDLE: 
            case POSITION.BEGIN_END: 
            case POSITION.MIDDLE_END: 
                  return mixedGenerate(position, nRestPositionToAllocate);
            case POSITION.BEGIN_MIDDLE_END:
                  const combinationOfRestPositions = generationBaseN(nRestPositionToAllocate, 3, {startValue: 1, rangeStep: 1});
                  if (combinationOfRestPositions?.length) {
                        // from combination filter 
                        return combinationOfRestPositions
                                    .filter(arrC => arrC.reduce((total, cur) => total + cur,0) === nRestPositionToAllocate)
                                    .reduce((memo, arrCC) => {
                                          const allConbinationAtBeginPosition = binaryGeneratePrograming(arrCC[0], BINARY_ARRAY);
                                          const allConbinationAtMiddlePosition = binaryGeneratePrograming(arrCC[1], BINARY_ARRAY);
                                          const allConbinationAtEndPosition = binaryGeneratePrograming(arrCC[2], BINARY_ARRAY);
                                          return [
                                                ...memo,
                                                ...filterResultFromBinaryGenerate(allConbinationAtBeginPosition).reduce((memo, ee) => {
                                                      return [
                                                            ...memo, 
                                                            ...filterResultFromBinaryGenerate(allConbinationAtMiddlePosition)
                                                            .map(eee => resultBuilder(position, ee, eee))
                                                      ];
                                                },[])
                                          ]
                                    },[])
                  }
            default:
                  throw Error(`Position parameter value: ${position} is invalid!`);
      }
}

function mixedGenerate(position, nRestPositionToAllocate) {
      utils.validateParameters(nRestPositionToAllocate);
      let results = [];
      for(let i = 1; i < nRestPositionToAllocate; i++) {
            const restResults = binaryGeneratePrograming(i, BINARY_ARRAY);
            const restResultsWithRevertLength = binaryGeneratePrograming(nRestPositionToAllocate - i, BINARY_ARRAY);
            results = [
                  ...results,
                  ...filterResultFromBinaryGenerate(restResults).reduce((memo, ee) => {
                        return [
                              ...memo, 
                              ...filterResultFromBinaryGenerate(restResultsWithRevertLength)
                              .map(eee => resultBuilder(position, ee, eee))
                        ];
                  }, [])
            ];
            // This case to prevent duplicate sub-element when it build from rest revert binary array
            if (restResults.length !== restResultsWithRevertLength.length) {
                  results = [
                        ...results,
                        ...filterResultFromBinaryGenerate(restResultsWithRevertLength).reduce((memo, ee) => {
                              return [
                                    ...memo, 
                                    ...filterResultFromBinaryGenerate(restResults)
                                    .map(eee => resultBuilder(position, ee, eee))
                              ];
                        },[]),
                  ];
            }
      };
      return results;
}

function restResultArrayBuilder(formater, restResult) {
      let count = 0;
      if (!restResult?.length) {
            throw Error("Rest result array must be length greater than 0.");
      }
      const resultNomarlize =  formater.replace(/_/g, function(match) {
            count++;
            if (count === 1) {
                  return restResult[0].join(",");
            } else if (count === 2) {
                  return restResult[1].join(",");
            } else {
                  return match; // not replace
            }
      });
      return resultNomarlize.split(",").map(v => Number(v));
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
// const results3 = solution(6);
const results4 = solution(8);

// console.log("results === ", results);
// console.log("results1 === ", results1);
// console.log("results2 === ", results2);
// console.log("results3 === ", results3);
// console.log("results4 === ", results3);

// writeFile("BinaryGenerateWithLength.txt", results3);

console.log("results4 === ", results4);

writeFile("BinaryGenerateWithLength.txt", results4);

