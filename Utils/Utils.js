const { COLOR_CODE } = require('./AppConstants');
class Utils {
      static autogenerateArrNumber(startValue, rangeStep, size) {
            utils.validateParameters(startValue, rangeStep, size);
            const results = [startValue];
            let iControl = 1;
            while (iControl <= size - 1) {
                  results[iControl] = results[iControl - 1] + rangeStep;
                  ++iControl;
            }
            return results;
      }

      static convertRepeatElementToArray(v, nRepeat) {
            if (typeof v !== 'string') {
                  throw Error('Repeat value must be an string.');
            }
            utils.validateParameters(nRepeat);
            return v
                  .repeat(nRepeat)
                  .split('')
                  .map((vv) => Number(vv));
      }

      static validateIntegerPositiveNumber(n) {
            // valid for number parameter
            if (n < 0 || n > Math.pow(10, 5) || !Number.isInteger(n)) {
                  throw Error(
                        'Number type must be greater than 0 and less than 10^5.'
                  );
            }
      }

      static validateArraySource(arrSource) {
            if (!arrSource?.length) {
                  throw Error(
                        'Array parameter must be have length greater than 0.'
                  );
            }
      }

      static validateParameters(...params) {
            if (!params.length) return;
            params.forEach((p) => {
                  if (typeof p === 'number') {
                        validateIntegerPositiveNumber(p);
                  } else if (Array.isArray(p)) {
                        validateIntegerPositiveNumber(p);
                  }
            });
      }

      /**
       * This method will help us setup color for text on console screen
       * @param {*} textColor @@ The color of text output
       * @param {*} nextControlColor @@ The color of next control screen
       */
      static getConsoleColor(
            textColor = COLOR_CODE.FG_COLOR.FgCyan,
            nextControlColor = COLOR_CODE.CONTROL_COLOR.Reset
      ) {
            return `${textColor}%s${nextControlColor}`;
      }
}

const utils = new Utils();

module.exports = { utils, Utils };
