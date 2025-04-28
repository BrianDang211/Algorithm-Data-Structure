const FS_PROMISE = require('fs/promises');
const FS = require('fs');
const path = require('path');

const { FILE_EXTENSIONS, ERROR_MESSAGES } = require('./AppConstants');

const KEY_PROPERTIES = {
      file_path: 'file_path',
      file_content: 'file_content',
      file_extension: 'file_extension',
};

class FileUtils {
      filePath;
      fileContent = '';
      fileExtension = '';

      paramValidInfo = {};

      constructor(filePath = '') {
            this.setFilePath(filePath);
            this.initParamValidInfo();
      }

      initParamValidInfo() {
            if (!Object.keys(this.paramValidInfo).length) {
                  Object.keys(KEY_PROPERTIES).forEach((k) => {
                        this.paramValidInfo[k] = {
                              isValid: false,
                              messages: [],
                        };
                  });
            }
      }

      setParamValidInfo(key = '', value = { isValid: false, messages: [] }) {
            if (!key) {
                  return;
            }
            if (!Object.keys(KEY_PROPERTIES).includes(key)) {
                  throw new Error(`The key ${key} is not exist.`);
            }
            this.paramValidInfo[key] = value;
      }

      setFilePath(filePath) {
            console.log('setFilePath -> filePath: ', filePath);
            this.validateFilePath(filePath);
            this.catchError();
            this.filePath = filePath;
            this.setFileExtension();
            this.setFileContent('');
            this.initParamValidInfo();
      }

      setFileContent(fileContent) {
            this.validateFileContent(fileContent);
            this.catchError();
            if (fileContent === '') return;
            if (this.fileExtension === FILE_EXTENSIONS.CSV) {
                  fileContent = this.normalizeContentForCsvFile(fileContent);
            } else {
                  fileContent = fileContent;
            }
            //console.log('setFileContent -> fileContent: ', fileContent);
            this.fileContent = fileContent;
      }

      setFileExtension() {
            const fileExtension = this.getFileExtension();
            this.validateFileExtension(fileExtension);
            this.catchError();
            this.fileExtension = fileExtension;
      }

      normalizeContentForCsvFile(content) {
            if (
                  !content ||
                  this.paramValidInfo[KEY_PROPERTIES.file_content]?.isValid ===
                        false
            ) {
                  return;
            }
            return content.map((row) => row.join(',')).join('\n');
      }

      catchError() {
            const keyOfParam = Object.keys(this.paramValidInfo);
            for (let i = 0; i < keyOfParam.length; i++) {
                  const validInfo = this.paramValidInfo[keyOfParam[i]];
                  if (validInfo?.messages?.length) {
                        throw new Error(validInfo.messages.join('/n'));
                  }
            }
      }

      validateFilePath(filePath) {
            if (filePath === null || filePath === undefined) {
                  this.setParamValidInfo(KEY_PROPERTIES.file_path, {
                        isValid: false,
                        messages: [
                              ERROR_MESSAGES.field_can_not_be_empty('filePath'),
                        ],
                  });
            } else {
                  this.setParamValidInfo(KEY_PROPERTIES.file_path, {
                        isValid: true,
                        messages: [],
                  });
            }
      }

      validateFileExtension(fileExtension) {
            if (
                  fileExtension === null ||
                  fileExtension === undefined ||
                  !Object.values(FILE_EXTENSIONS).includes(fileExtension)
            ) {
                  this.setParamValidInfo(KEY_PROPERTIES.file_extension, {
                        isValid: false,
                        messages: [
                              ERROR_MESSAGES.field_can_not_be_empty(
                                    'fileExtension'
                              ),
                        ],
                  });
            } else {
                  this.setParamValidInfo(KEY_PROPERTIES.file_extension, {
                        isValid: true,
                        messages: [],
                  });
            }
      }

      validateFileContent(fileContent) {
            if (fileContent === null || fileContent === undefined) {
                  this.setParamValidInfo(KEY_PROPERTIES.file_content, {
                        isValid: false,
                        messages: [
                              ERROR_MESSAGES.field_can_not_be_empty(
                                    'fileContent'
                              ),
                        ],
                  });
                  return;
            }
            if (fileContent === '') return;
            if (this.paramValidInfo[KEY_PROPERTIES.file_extension]?.isValid) {
                  const fileContentParamValidInfo =
                        this.paramValidInfo[KEY_PROPERTIES.file_content];

                  switch (this.fileExtension) {
                        case FILE_EXTENSIONS.TXT:
                              if (typeof this.fileContent !== 'string') {
                                    if (fileContentParamValidInfo) {
                                          fileContentParamValidInfo.isValid = false;
                                          fileContentParamValidInfo.messages = [
                                                ...(fileContentParamValidInfo.messages ||
                                                      []),
                                                'The data type of fileContent must be string.',
                                          ];
                                    }
                              }
                              return;
                        /**
                         * The below example is standard format of content data for file extension is csv
                         * const data = [
                         *           ['Name', 'Age', 'City'], // Header row
                         *           ['Alice', 25, 'New York'],
                         *           ['Bob', 30, 'San Francisco'],
                         *           ['Charlie', 35, 'Chicago']
                         * ];
                         */
                        case FILE_EXTENSIONS.CSV:
                              if (!Array.isArray(this.fileContent)) {
                                    if (fileContentParamValidInfo) {
                                          fileContentParamValidInfo.isValid = false;
                                          fileContentParamValidInfo.messages = [
                                                ...(fileContentParamValidInfo.messages ||
                                                      []),
                                                'The data-type of fileContent must be array when the fileExtension is csv.',
                                          ];
                                    }
                              }
                              return;
                        default:
                              fileContentParamValidInfo.isValid = false;
                              fileContentParamValidInfo.messages = [
                                    ...(fileContentParamValidInfo.messages ||
                                          []),
                                    `The fileExtension: ${this.fileExtension} is not valid...`,
                              ];
                              return;
                  }
            }
            this.setParamValidInfo(KEY_PROPERTIES.file_content, {
                  isValid: true,
                  messages: [],
            });
      }

      async isFileExisted() {
            if (!this.filePath) return;
            return await FS.existsSync(this.filePath);
      }

      getFileExtension() {
            const filePathSplit = this.filePath.split('\\');
            if (!filePathSplit?.length) return;
            const fileName = filePathSplit[filePathSplit.length - 1].split('.');
            return fileName[fileName.length - 1];
      }

      /**
       * With business logic if the path of file already existed in the system, we will
       * append the new content into the old content, otherwise we will create new file
       */
      new_write_couter = 0;
      append_write_couter = 0;

      async writeFile() {
            this.catchError();
            try {
                  const directoryPath = path.dirname(this.filePath);
                  await FS_PROMISE.mkdir(directoryPath, { recursive: true });

                  const isFileExisted = await this.isFileExisted();
                  if (!isFileExisted) {
                        this.new_write_couter += 1;
                        // console.log(
                        //       'new_write_couter -> ',
                        //       this.new_write_couter
                        // );
                        // console.log('new content -> ', this.fileContent);
                        // console.log('The first line -> ', this.fileContent);
                        await FS_PROMISE.writeFile(
                              this.filePath,
                              this.fileContent,
                              (err) => {
                                    if (err) throw err;
                              }
                        );
                  } else {
                        this.append_write_couter += 1;
                        // console.log(
                        //       'append_write_couter -> ',
                        //       this.append_write_couter
                        // );

                        // console.log(
                        //       'Append data to file... -> ',
                        //       this.fileContent
                        // );
                        await FS_PROMISE.appendFile(
                              this.filePath,
                              this.fileContent,
                              (err) => {
                                    if (err) throw err;
                              }
                        );
                  }
            } catch (err) {
                  console.log('Write file error log: ');
                  console.log(err);
            }
      }
}

module.exports = { FileUtils };
