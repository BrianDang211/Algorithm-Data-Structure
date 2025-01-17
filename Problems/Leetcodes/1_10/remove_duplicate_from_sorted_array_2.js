/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 * In this problem, we already improve our problem before.
 * 
 * - Add more condition for the unique element
 * 
 * - We can re-define the duplicate element concept:
 * An element called dupllicate and should deleted when it is element occurence from third
 * 
 * So the first elements in array after change, they are element with order occurence less than or equal 2
 * 
 * 
 * With input is integer array nums = [1,1,1,2,2,3] => sorted in acreasing order
 * 
 * 
 * 
 */
var removeDuplicates = function(nums) {
    if (!nums.length) return 0;
    let k = 0;
    const sizeOfNums = nums.length;
    for (let i = 0; i<sizeOfNums;) {
        if (i+2 <= sizeOfNums-1 && nums[i] === nums[i+2]) {
          i+=3;
          k+=2;
          continue;
        };
        // if (nums[i] === nums[i+1]) {
        //   k+=2;
        //   i+2;
        // };
        if (nums[i] != nums[k]) {
          nums[k] = nums[i];
        };
        k++;
        i++;
        console.log("====================");
        console.log("i: ", i);
        console.log("k: ", k);
        console.log("nums: ", nums);
        console.log("=====================");
    };
    return k;
};

removeDuplicates([0,0,1,1,1,1,2,3,3]);