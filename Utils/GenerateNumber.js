const { validateParameters } = require("./Validates");

function autogenerateArrNumber(startValue, rangeStep, size) {
      validateParameters(startValue, rangeStep, size);
      const results = [startValue];
      let iControl = 1;
      while(iControl <= size-1) {
            results[iControl] = results[iControl - 1] + rangeStep;
            ++iControl;
      }
      return results;
}

module.exports = { autogenerateArrNumber }
