/**
 * Input:
 * - N E Z+, N <= 100
 * Ouput:
 * + String which satisfied three conditions below:
 * ++ String result must have length equal N
 * ++ Any two sub-string inside string result must unique
 * ++ String result must have least `C` character.
 */
const { getSubArray } = require("../../Utils/Utils");

const n = 10;

// setup input
const ABC_CHARACTERS = ['A', 'B', 'C'];

function abc() {
      // The result string has n characters
      // Pseudo the string result is an array with size equal n
      // We must find for n position from 0->n-1, with value for each position choosed from ABC_CHARACTERS array


      // with each pair sub-string will have any length: 
      /**
       * For example: 
       * result string: ABCBAC 
       * + I can choose some two sub-string:
       * ++ The first one i have two sub-string are: (A,B) -> (0,1) (Each sub-string has lenght equal one)
       * ++ The second example: I get two sub-string are: (AB,CB) -> ([0,1], [2,3]) (Has length equal two)
       * ++ The third example: I get two sub-string are: (ABC, BAC) -> (Each sub-string in this example has lenght equal three)
       * 
       * ++ one more example: I can check two sub-string are: (A, ABC), (A, AB), (AB, ABC)
       * 
       * we must separte check: it based on the n input value
       * sub-string for lenght from: 1->n/2 (n divide [dəˈvīd] 2)
       * 
       * For example n=10
       * we can setup the check condition for each-substring with length from 1->5
       * + 1,2,3,4,5
       */

      // The third condition: String result must have least `C` character
      /**
       * I think the solution for this condition below:
       * Because our string result must have both three character 'A', 'B', and 'C'
       * so the minimum of 'C' character in string result is one. (It true if n equal 3)
       * 
       * if n greater than three, i think 
       * 
       * n = 4 => ABCB, 
       * 
       * [x1,x2,x3,x4]
       * 
       * x1 -> A, B, C (A)
       *    x2 -> B, C (B)
       *       x3 -> C (C)
       *          x4 -> A, B (A | B)
       * Recursive programming for build string result
       * ABCA, ABCB
       * 
       * // base idea of resursive programing is divide a big problem to mutiple small problems
       * 
       * n is lenght of string result
       *
       * function recursive(n=1, currentValue) {
       *    const results = [];
       *    // This is the loop for each position 
       *    loop 0->n-1
       *          // for each position we must find value which avaiable for it
       *          loop value_avaiables for each position:
       *                
       *          endloop.
       *    endloop
       *    return results;
       * }
       */

};

let couter_minimum_c_character = 0;

// The data-structure of result has formar
// results = [[A,B,C], [B,A,C]]
function solution(position=1, currentValue) {
      const characterForCurrentPositions = getCharacterForCurrentPosition(currentValue);
      if (position === n) {
            // I want any case when excute recursive must return the same output format
            return characterForCurrentPositions.map(c => [c]);
      };
      const results = [];
      // next position
      const nextPosition = position + 1;
      characterForCurrentPositions.forEach(c => {
            // find value for next position
            const valueOfNextPosition = solution(nextPosition, c);
            let count_c_character = 0; // only filter in a stack frame, can not filter in another stack frame.
            for(let i=0; i<valueOfNextPosition.length; i++) {
                  const vv = valueOfNextPosition[i];
                  const mergeResult = [c,...vv];
                  // start for filter condition ^^
                  if (mergeResult.length === 5
                        && !(mergeResult.some(c=>c==='C') 
                              && mergeResult.some(c=>c==='A') 
                                    && mergeResult.some(c=>c==='B'))
                  ) {
                        continue;
                  };
                  const filter_c_character = mergeResult.filter(vvv => vvv === 'C');
                  if (mergeResult.length === n) {
                        if (couter_minimum_c_character != 0 && couter_minimum_c_character < filter_c_character.length) continue;
                        couter_minimum_c_character = filter_c_character.length;
                  };
                  if (count_c_character != 0 && count_c_character < filter_c_character?.length) {
                        continue;
                  };
                  count_c_character = filter_c_character?.length;
                  // filter direct at here
                  if (mergeResult.length >= 2 && checkDuplicateOfTwoSubString(mergeResult)) {
                        // console.log("mergeResult === ", mergeResult);
                        continue;
                  };
                  results.push(mergeResult);
            };
      });
      return results;
};

// This function has reponsibility check and filter elements in string result
function filterCondition() {
      const results = solution();
      // console.log("results === ", results);
      if (!results.length) return [];
      // the first condition, we keep result item in results array which has two sub-string are difficult
      return results.filter(re => !checkDuplicateOfTwoSubString(re));
};

function checkDuplicateOfTwoSubString(resultStringArr) {
      if (!resultStringArr || !Array.isArray(resultStringArr)) return false;
      for(let subLength=1; subLength <= resultStringArr.length/2; subLength++) {
            for(let i=0; i<resultStringArr.length; i++) {
                  try {
                        const subString1 = getSubArray(resultStringArr, i, i+subLength).join(",");
                        const subString2 = getSubArray(resultStringArr, i+subLength, i+2*subLength).join(",");
                        if (subString1===subString2) return true;
                  } catch (error) {
                        // to do something
                  };
            };
      };
      return false;
};

function getCharacterForCurrentPosition(excludeCharacter) {
      if (!excludeCharacter) return ABC_CHARACTERS;
      return ABC_CHARACTERS.filter(c => {
            if (excludeCharacter === undefined) return true;
            return excludeCharacter !== c;
      }); 
};

function run() {
      const start_time = Date.now();
      // const test = checkDuplicateOfTwoSubString([ 'C', 'A', 'B', 'A', 'B' ]);
      // console.log(test);
      //filterCondition();
      const ss = solution();
      console.log("n_results === ,", ss);
      // const end_time = Date.now();
      // const totalTime = end_time-start_time;
      // console.log("total time === ", totalTime);
};

run();

