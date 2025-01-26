/**
 * About the dynamic programming for fibonacci problem
 * 
 * First of all, we need understand the base idea of it.
 * 
 * 1) We need recognize the base-case for dynamic programming
 * 2) We need recognize the formule for each calculate in dynamic programming.
 * 3) We need create an store where store all value of a dynamic programming (It can an array or linked list)
 * 
 */

function fibonacci(n) {
      if (n<2) return 1;
      // step 1: we must recognize base-case
      const f = new Array(n);
      f[0]=f[1]=1;
      for(let i=2; i<f.length; i++) {
            f[i] = f[i-1] + f[i-2];
      };
      return f[n-1];
};

console.log(fibonacci(3));