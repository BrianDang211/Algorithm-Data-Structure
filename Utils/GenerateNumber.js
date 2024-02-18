function autogenerateArrNumber(startValue, rangeStep, length) {
      if (startValue < 0 || rangeStep < 0 || length < 0) return [];
      const results = [startValue];
      let iControl = 1;
      while(iControl <= length-1) {
            results[iControl] = results[iControl - 1] + rangeStep;
            ++iControl;
      }
      return results;
}

module.exports = { autogenerateArrNumber }
