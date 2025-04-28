const { loggor } = require('../Loggor');

function run() {
      const data = `
            1
                  |                             |                       |
                  |                             |                       |
                  |                             |                       |
                  2                             3                       4
                        |     |           |           |     |     |
                        |     |           |           |     |     |
                        |     |           |           |     |     |
                        4     5           1 (existed) 7     8     9
                                    |
                                    |
                                    |
                                    6
      `;
      console.log('Test data: ', data);
      loggor.writeLog(data);
}

run();
