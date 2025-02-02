const winston = require('winston');
// const stackTrace = require('stack-trace');

function getSubArray(parentArray, startIdx, endIdx) {
      if (
            !Array.isArray(parentArray) ||
            startIdx === -1 ||
            startIdx >= parentArray.length ||
            endIdx === -1 ||
            endIdx > parentArray.length
      ) {
            throw new Error(`Invalid parameter, please check again with some condition below:
                  1. The argument parentArray must be an array.
                  2. The argument startIdx must be an integer number and it must be greater or equal than 0 and less than length of parent Array  
                  3. The argument endIdx must be a integer number, it must be greater or equal than 0 and less or equal than length of parent Array and it must be greater than startIdx 
            `);
      }
      const subArray = [];
      for (let i = startIdx; i < endIdx; i++) {
            subArray.push(parentArray[i]);
      }
      return subArray;
}

function swapTwoElementInArray(arr, i1, i2) {
      if (!arr.length || i1 < 0 || i1 > arr.length || i2 < 0 || i2 > arr.length)
            return;
      const temp = arr[i1];
      arr[i1] = arr[i2];
      arr[i2] = temp;
}

function reassignAndDilationArray(from, to, array) {
      // in here we already had neo position
      let memos = [];
      for (let j1 = from; j1 < to; j1++) {
            memos.push(array[j1]);
      }
      array[from] = array[to];
      // How can we do it?
      let k = 0;
      for (let j2 = from + 1; j2 <= to; j2++) {
            array[j2] = memos[k];
            k++;
      }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

module.exports = {
      logger,
      getSubArray,
      reassignAndDilationArray,
      swapTwoElementInArray,
};
