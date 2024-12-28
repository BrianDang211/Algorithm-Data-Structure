// Input: With a expression: [[1+2*3+(10-5*2)-{6+(10*8-3)}]]
/**
 * 1 + 2 * 3 = 7
 * S1: 3 * 2 + 1
 * S2: + * => (* | \)
 * S3: 1 2 3
 * 1 - 2 + 3
 * 3 + 2 - 1
 * 1 2 3
 * - +
 * 
 * 1 * 2 + 3 
 * 3 + 2 * 1
 * * +
 * 1 2 3  
 * 
 * @param {*} exp 
 */
// Output: result of expression
function expression(exp) {
      
}

const result = expression(exp);

console.log(exp);