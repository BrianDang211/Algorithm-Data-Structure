const fs = require('fs/promises');
const path = require('path'); // Import the 'path' module

async function writeFile(fileName, content) {
      if (!fileName || !content) throw Error("FileName or Content is empty.");
      try {
            const fullPath = path.join(`C:/Project/PublicRepos/Algorithm-Data-Structure/Logs/`, fileName);
            await fs.writeFile(fullPath, JSON.stringify(content));
      } catch (err) {
            console.error(err);
      }
}

module.exports = { writeFile }