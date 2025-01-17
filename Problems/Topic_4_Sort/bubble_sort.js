/**
 * In the all sort algothirm I always suppose that we sort array with order in acreasing
 * 
 * The idea of bubble sort is we will pick two element after we compare them 
 * and we will swap it.
 * And the last element of array is greater number
 * 
 * So to implement it we must have two loops
 * 
 * We can analytic about time complex:
 * 
 * T(n) ~ 
 *  
 */
function bubbleSort(arr) {
      if (!arr.length) return;
      const arr_length = arr.length;
      let k=0;
      while(k < arr_length) {
            for (let i=0; i<arr_length-k; i++) {
                  if ((i+1 < arr.length) && arr[i] > arr[i+1]) {
                        const t = arr[i+1];
                        arr[i+1] = arr[i];
                        arr[i] = t; 
                  };
                  if (i===arr_length-k-1) {
                        k++;
                  };
            };
      };
      console.log("array: ", arr);
};

bubbleSort([5,6,1,3,1,-1,0,10,0,9,8]);





