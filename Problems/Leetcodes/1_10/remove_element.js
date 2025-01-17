/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

/**
 * Before implement this issue, we will describe the problem again.
 * Input:
 * - An integer array, we call it is nums
 * - An integer val, we call it is val
 * 
 * Output:
 * - An integer number, we call it is k which is number elements of array which not equal val
 * - The integer array nums must changed after we run solution with some condition:
 *    + Elements which have value equal val will deleted in nums array
 *    + Elements are equal val will replace by any character (in here we will use underscore character)
 * 
 * numberSwap=0;
 * 
 * Step 1: Find all elements which equal val by underscore character, and at the same time we must swap this element with 
 * next element (We only excute swap when the next element not equal val)
 * 
 * Step 2: We will return k is numberSwap
 * 
 * 
 */
/**
 * input array:
 * It is an integer array
 * For example I have an integer array is [3,2,2,3], val=3
 * 
 * We expect that output:
 * Return an integer number, it call k, It is number of elements which have value not equal val
 * At the same time I must change position for these elements, that means we must update the input array
 * with format, we can understand it similar with we separate the input array into two segments
 * 
 * The first segment it call the elements not equal val
 * and the second segment it call the elements equal val
 * 
 * With the second segment, we don't care about value of it as long as its must include inside the second segment.
 * 
 * 
 * So back to the above example, we have an integer array is [3,2,2,3], val = 3
 * 
 * output: 
 *  k = 0;
 *  loop to check each element inside that integer array
 *    if element not equal val:
 *          nums[k] = element;
 *          k++;
 * 
 * 
 * 
 */
var removeElement = function(nums, val) {
    if (!nums.length || !Number.isInteger(val)) return 0;
    let k = 0;
    for(let i=0; i < nums.length; i++) {  
      if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
      };
    };
    console.log("nums: ", nums);
    return k;
};

console.log(removeElement([3,2,2,3], 3));
