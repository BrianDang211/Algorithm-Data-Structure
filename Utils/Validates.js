function validateIntegerNumber(n) {
      // valid for number parameter
      if (n < 0 || n > Math.pow(10,5)) {  
            throw Error("Number type must be greater than 0 and less than 10^5.");
      }
}

function validateArraySource(arrSource) {
      if (!arrSource?.length) {
            throw Error("Array parameter must be have length greater than 0.");
      }
}

function validateParameters(...params) {
      if (!params.length) return;
      params.forEach(p => {
            if (typeof p === "number") {
                  validateIntegerNumber(p);
            } else if (Array.isArray(p)) {
                  validateIntegerNumber(p);
            }          
      })
}

module.exports = { validateParameters, validateIntegerNumber, validateArraySource };