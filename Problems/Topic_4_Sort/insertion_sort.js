/**
 * The idea of insertion sort is we will sort on sub-array, because instead of we sort in an array, we can sort 
 * on multiple segment array
 * For example:
 * array = [3,5,1,-1,0]
 * 
 * Pharse-1:
 * sub-array = [3]
 * current_value = 5;
 * 
 * I will compare the current_value with value of elements in sub_array
 * 
 * 
 * 
 * sub-array = [3,5]
 * 
 * Let me tell you my idea how to I implement it step by step?
 * 
 * 
 * 
 * 
 */
const { swapTwoElementInArray, reassignAndDilationArray } = require("../../Utils/Utils");

function insertionSort(arr) {
      if (!arr.length) return;
      // the first loop, it is loop for elements put into the sub-array
      for (let i=1; i<arr.length; i++) {
            // the second loop, it is sub-array
            for(let j=0; j<i; j++) {
                  // write some code do find correct position for current element in sub-array
                  // If the number of elements of sub-array greater than or equal two elements
                  if (i >= 2) {
                        if (arr[i] >= arr[j]) {
                              if (j+1 < i && arr[i] > arr[j+1]) {
                                    continue;
                              };
                              reassignAndDilationArray(j+1,i,arr);
                              break;
                        };
                        if (arr[i] < arr[0]) {
                              reassignAndDilationArray(j,i,arr);
                              break;
                        };
                  } else {
                        if (arr[i] < arr[j]) {
                              swapTwoElementInArray(arr,i,j);
                        };
                  };
            };
      };
      console.log(arr);
};

insertionSort([23,0,10,5,2,0,-1,99,10,-1,0,-3]);