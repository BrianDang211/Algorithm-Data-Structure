/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// The purpose: 
/**
Time complexity: O(m+n)
 */
let m1,n1;
const nums1 = [-10,-10,-9,-9,-9,-8,-8,-7,-7,-7,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-4,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,1,2,2,2,3,3,3,4,5,5,6,6,6,6,7,7,7,7,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const nums2 = [-10,-10,-9,-9,-9,-9,-8,-8,-8,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,9,9,9,9];

var merge = function(nums1,m,nums2,n) {
    if (m < 0 || n <= 0 || m > 200 || n > 200) return;
    const total_length = m+n;
    if (total_length < 0 || total_length > 200) return;
    // assign control variable
    m1=m;
    n1=n;
    for(let i=0; i<nums2.length; i++) {
        binarySearchAndPutElementFromNums2ToNums1(nums1,nums2[i]);
    };
    console.log("nums1: ", nums1);
};

function binarySearchAndPutElementFromNums2ToNums1(nums1,elementFromNums2) {
    if (!Number.isInteger(elementFromNums2) || !nums1.length) return;
    if (m1 === 0) {
        putElement(nums1,0,elementFromNums2);
        return;
    };
    let startIdx = 0;
    let endIdx = m1-1;
    // O(log(m+n))
    while(startIdx <= endIdx) {
        const midIdx = startIdx + Math.floor((endIdx-startIdx)/2);
        if (elementFromNums2 === nums1[midIdx]) {
            putElement(nums1,midIdx+1,elementFromNums2);
            break;
        } else if (elementFromNums2 > nums1[midIdx]) {
            // why has exist case midIdx + 1 >= m1 because this is case for
            // elementFromNums2 is largtest number in nums1 array, and at position 
            // midIdx + 1 is the offset position (that mean it similar with position of nums2)
            if (elementFromNums2 <= nums1[midIdx+1] || (midIdx+1>=m1)) {
                putElement(nums1,midIdx+1,elementFromNums2);
                break;
            } else {
                startIdx=midIdx+1;
            };
        } else if (elementFromNums2 < nums1[midIdx]) {
            // Bound case
            if (midIdx - 1 < 0) {
                putElement(nums1,0,elementFromNums2);
                break;
            } else if (elementFromNums2 >= nums1[midIdx-1]) {
                putElement(nums1,midIdx,elementFromNums2);
                break;
            } else {
                endIdx=midIdx-1;
            };
        };
    };
};

function putElement(nums1,position,element) {
    if (!nums1.length 
        || position < 0 
        || !Number.isInteger(element)
    ) {
        return;
    };
    const memoRestElementFromNums1 = [];
    // T(n) = 2*O(m1-(midIdx+1)-1)
    if (position >= m1) {
        nums1[position] = element;
    } else {
        let i = position;
        while(i < m1) {
            memoRestElementFromNums1.push(nums1[i]);
            nums1[i]=0;
            i++;
        };
        nums1[position] = element;
        for (let i=0; i < memoRestElementFromNums1.length; i++) {
            nums1[position+1+i] = memoRestElementFromNums1[i];
        };
    };
    m1++;
    n1--;
};

merge(nums1, 55, nums2, 99);