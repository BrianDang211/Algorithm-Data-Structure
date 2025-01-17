/**
 * @param {number[]} nums
 * @return {number}
 * Input value:
 * An integer array which elements sorted in creasing order.
 * The requirement:
 * - Each element in the input array only occurence once time.
 * - With each element unique in nums array, we must keep position of it in nums array
 * 
 * Output we expected:
 * 
 * psedo code:
 * k = 0
 * loop element in input_array:
 *          if element <> element at next position:
 *                k++;
 *                nums[k] = element;
 * return k
 *          
 * 
 * 
 * 
 */
var removeDuplicates = function(nums) {
      if (!nums.length) return 0;
      let k = 0;
      for(let i=0; i < nums.length; i++) {
            if (nums[i] !== nums[i+1]) {
                  k++;
                  nums[k] = nums[i+1];
            };
      };
      return k;
};