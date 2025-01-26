/**
 * The idea of quicksort algothirm
 * We have input is an integer array 
 * 
 * - Step 1: We will pick a key, it called pivot_key
 * - Step 2: We will excute re-order position for elemnts which least then pivot key, by put them before pivot_key,
 * and the elements greater than pivot key we will put them after pivot key
 * + We have already had two segments
 * ++ The first segment: It is elements least than pivot key
 * ++ The second segment: It is elements greater than pivot key
 * - Step 3: We will excute similar step from 1 -> 2 for segment 1 and segment 2
 * 
 * Let's me implement it for you.
 * 
 * For example:
 * Input: A = [23,1,10,5,2]
 * 1) Choose pivot key is 10
 * 2) Re-order rest-elements of array by put all elements which least than pivot key before it
 * 
 * *** Algothirm:
 * const idx_pivot = A/2;
 * After then we must re-order other elements and put them into the two segments:
 * 
 * First segment: Only include elements which least than the element at pivot
 * Second segment: Only include elements which greater than the element at pivot
 * 
 * I will tell you my step by step:
 * 
 * // choose it
 * const pivot = A[A.l/2];
 * 
 * // some programming to re-order rest elements 
 * 
 * When is we stop?
 * Let's me thinking sometime
 *  
 * 
 * 
 * 
 * 
 */
function quickSort(arr) {p
      if(!arr.length) return;
      console.log("Array after run: ", arr);
};    