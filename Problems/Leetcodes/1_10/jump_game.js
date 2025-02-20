/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 * Talking Problem: We have an integer array numbers, with each element inside this array is maximum of jump from current 
 * position to the next position with number of jump is current value of array
 * 
 * That mean with each position i we can jump with maximum jump is nums[i]
 * 
 * Requirement: We must check the input array is valid?
 * 
 * For example:
 * Input: [2,3,1,1,4]
 * Ouput: Return true if we can reach the last index, or false otherwise. 
 * 
 * The idea for this problem:
 * 
 *  
 */
var nums1=[];
var canJump = function(nums) {
      if (nums.length < 0 || nums.length > Math.pow(10,4)) return false;
      if (!nums.includes(0) || (nums.length === 1 && nums[0] === 0)) return true;
      if (nums[0]===0) return false;
      nums1=nums;
      console.log("nums: ", nums);
      let startIdxOfSegmentArray = 0;
      let neoIdxOfSegmentArray = findPositionOfNeo(startIdxOfSegmentArray,nums);
      while(startIdxOfSegmentArray <= neoIdxOfSegmentArray) {
            // find max value of segment array and compare it with the index of O element
            const maxPostionCanMove = getMaxInRange(
                  startIdxOfSegmentArray,
                  neoIdxOfSegmentArray,
                  nums
            );
            if (maxPostionCanMove >= nums.length-1) return true;
            if (maxPostionCanMove < neoIdxOfSegmentArray) {
                  return false;
            };
            if (maxPostionCanMove === neoIdxOfSegmentArray) {
                  if (neoIdxOfSegmentArray === nums.length-1) return true;
                  return false;
            };
            log("Max of position for each segment: ",maxPostionCanMove);

            startIdxOfSegmentArray = findTheStartPositionOfNextSegment(neoIdxOfSegmentArray, maxPostionCanMove, nums);

            log("Start Index of Next Segment ", startIdxOfSegmentArray);

            // chuck array
            neoIdxOfSegmentArray = findPositionOfNeo(startIdxOfSegmentArray,nums);
      };
      return true;
};

function findTheStartPositionOfNextSegment(indexOfNeoOfPreviousSegment,maxPositionFromPreviousSegment, nums) {
      if (!maxPositionFromPreviousSegment 
            || maxPositionFromPreviousSegment < 0
            || indexOfNeoOfPreviousSegment < 0
            || indexOfNeoOfPreviousSegment > nums.length
            || !nums.length
      ) return 0;
      let startOfRange = indexOfNeoOfPreviousSegment;
      let endOfRange = maxPositionFromPreviousSegment
      let maxPositionInRange = getMaxInRange(startOfRange, endOfRange, nums);
      log("init start: ", startOfRange);
      log("init end: ", endOfRange);
      log("init log max for findTheStartPositionOfNextSegment: ", maxPositionInRange);
      while (maxPositionInRange > endOfRange) {
            startOfRange = endOfRange;
            endOfRange = maxPositionInRange;
            maxPositionInRange = getMaxInRange(startOfRange, endOfRange, nums);
            log("Log max for each find again: ",maxPositionInRange);
      };
      return endOfRange;
};

function log(prefixTextLog="",pos) {
      console.log(prefixTextLog + ", =======================================================");
      console.log("At position: ", pos);
      console.log("before of pos: ", nums1[pos-1]);
      console.log("value of pos: ", nums1[pos]);
      console.log("after of pos: ", nums1[pos+1]);
      console.log("=======================================================");
} 

function getMaxInRange(start, end, nums) {
      if (start > end 
            || !nums?.length
            || end >= nums.length
            || start < 0
            || end < 0
            || start > nums.length
      ) return 0;
      let maxPositionOfStart = nums[start] + start;
      for (let i=start; i<=end; i++) {
            if (nums[i] === 0) continue;
            const compareValue = nums[i] + i;
            if (maxPositionOfStart < compareValue) {
                  maxPositionOfStart = compareValue;
            };
      };
      return maxPositionOfStart;
};

function findPositionOfNeo(start, nums) {
      if (
            !nums?.length 
            || start < 0 
            || start > nums.length 
      ) return -1;
      for (let i=start; i<nums.length; i++) {
            if (nums[i] === 0) return i;
      };
      return -1;
};

console.log(canJump(
      [
            8,2,4,4,4,9,5,2,5,8,8,0,
            8,6,9,1,1,6,3,5,1,2,6,6,0,
            4,8,6,0,
            3,2,8,7,6,5,1,7,0,
            3,4,8,3,5,9,0,
            4,0,
            1,0,
            5,9,2,0,
            7,0,
            2,1,0,
            8,2,5,1,2,3,9,7,4,7,0,0,
            1,8,5,6,7,5,1,9,9,3,5,0,
            7,5
      ]
));

// console.log(canJump([1,0,0]));

// console.log(canJump([2,5,0,0]));
// console.log(canJump([2,0,0,0,2,0,0,0]));