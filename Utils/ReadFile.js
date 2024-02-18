const fs = require('node:fs/promises');

async function readTextFile(filePath) {
      if (!filePath) {
            throw new Error("FilePath can not be empty!");
      }
      try {
            const data = await fs.readFile(filePath, { encoding: 'utf8' });
            console.log(data);
      } catch (err) {
            console.error(err);
      }
}

module.exports = { readTextFile }
