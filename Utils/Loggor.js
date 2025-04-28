const { FileUtils } = require('./FileUtils');
const path = require('path');
const DEFAULT_LOG_FILE_NAME = 'log';
const DEFAULT_LOG_FILE_EXTENSION = 'txt';
const DEFAULT_LOG_FOLDER = path.resolve(__dirname, '..', 'Logs');
const DEFAULT_LOG_FILE_PATH = path.resolve(
      DEFAULT_LOG_FOLDER,
      `${DEFAULT_LOG_FILE_NAME}-${new Date().getTime()}.${DEFAULT_LOG_FILE_EXTENSION}`
);

class Loggor {
      logFilePath = DEFAULT_LOG_FILE_PATH;
      fileUtil = new FileUtils(this.logFilePath);

      constructor(logFilePath = DEFAULT_LOG_FILE_PATH) {
            this.setRootPath(logFilePath);
      }

      setRootPath(logFilePath) {
            if (!logFilePath || this.logFilePath === logFilePath) {
                  return;
            }
            this.logFilePath = logFilePath;
            this.fileUtil.setFilePath(this.logFilePath);
      }

      /**
       * This method will append subPath into the current logFilePath property, It's useful for some case
       * when developer want to override the logFilePath
       * @param {*} subPaths
       * @returns
       */
      appendSubPaths(subPaths = '') {
            if (!subPaths) return;
            const subPathFiltered = subPaths
                  .split('\\')
                  .filter((sp) => !this.logFilePath.split('\\').includes(sp));
            const newLogFilePath = path.join(
                  DEFAULT_LOG_FOLDER,
                  ...subPathFiltered
            );
            this.setRootPath(newLogFilePath);
      }

      writeLog(content) {
            if (!content) return;
            //console.log('writeLog -> content -> ', content);
            this.fileUtil.setFileContent(content);
            //console.log("Before write file data -> content -> ", fileUtil.fileContent);
            this.fileUtil.writeFile();
            console.log("Loggor -> writeLog -> new_write_couter -> ", this.fileUtil.new_write_couter);
            console.log("Loggor -> writeLog -> append_write_couter -> ", this.fileUtil.append_write_couter);
      }
}

const loggor = new Loggor();

module.exports = { loggor };
