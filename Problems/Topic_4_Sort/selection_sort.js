/**
 * The idea of selection sort 
 * we can imagine 
 * The normal idea 
 * Thinking:
 * 1) We will find minimal value of input array
 * 2) In computer:
 * Separate the input array to two components:
 * - Current element
 * - Sub array
 * 
 * Compare current_element with sub_array 
 * Swap (current_element, min in sub_array)
 *  
 */
// For acreasing sort, and with sort in decreasing it is similar with acreasing.
function selectionSort(array) {
      if (!array.length) return;
      for(let i=0; i<array.length; i++) {
            let j_min=i;
            for(let j=i; j<array.length; j++) {
                  if(array[j_min] > array[j]) {
                        j_min = j;
                  };
            };
            let temp = array[i];
            array[i]=array[j_min];
            array[j_min] = temp;
      };
      console.log(array);
};

selectionSort([2,1,3,5,1,6,0,-1,8,0,0,5]);
