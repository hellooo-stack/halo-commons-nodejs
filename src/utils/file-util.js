const fs = require('fs');
const path = require('path');
const os = require('os');
const cryptoUtil = require("./crypto-util");

function isFileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isFileExistsAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, err => {
            if (err) {
                resolve(false);
            }

            resolve(true);
        });
    });
}

function isFileReadable(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isFileReadableAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.R_OK, err => {
            if (err) {
                resolve(false);
            }

            resolve(true);
        });
    });
}

function isFileWritable(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.W_OK);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isFileWritableAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.W_OK, err => {
            if (err) {
                resolve(false);
            }

            resolve(true);
        });
    });
}

function isFileReadableAndWritable(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isFileReadableAndWritableAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, err => {
            if (err) {
                resolve(false);
            }

            resolve(true);
        });
    });
}

function isDirectory(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isDirectory();
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isDirectoryAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                resolve(false);
            }

            resolve(stats.isDirectory());
        });
    });
}

function isFile(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isFile();
    } catch (err) {
        console.error(err);
        return false;
    }
}

function isFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                resolve(false);
            }

            resolve(stats.isFile());
        });
    });
}

function systemEOFMarker() {
    return os.EOL;
}

function normalizePath(filePath) {
    return path.normalize(filePath);
}

/**
 * 运行当前程序的用户的家目录
 *
 * @returns {string}
 */
function homedirPath() {
    return normalizePath(os.homedir());
}

/**
 * The operating system-specific end-of-line marker.
 *
 * @returns {string} \n on POSIX  ,  \r\n on Windows
 */
function currentDirPath() {
    return path.resolve(__dirname);
}

function md5ForFile(filePath) {
    const content = fs.readFileSync(filePath);
    return cryptoUtil.md5(content);
}

function createReadStream(filePath, options) {
    return fs.createReadStream(filePath, options)
}

function createWriteStream(filePath, options) {
    return fs.createWriteStream(filePath, options);
}

function createWriteStreamIfNotExists(filePath) {
//    flags: https://nodejs.org/api/fs.html#file-system-flags
    return fs.createWriteStream(filePath, {
        flags: 'wx'
    });
}


module.exports = {
    isFileExists,
    isFileExistsAsync,
    isFileReadable,
    isFileReadableAsync,
    isFileWritable,
    isFileWritableAsync,
    isFileReadableAndWritable,
    isFileReadableAndWritableAsync,
    isDirectory,
    isDirectoryAsync,
    isFile,
    isFileAsync,
    systemEOFMarker,
    normalizePath,
    homedirPath,
    currentDirPath,
    md5ForFile,
    createReadStream,
    createWriteStream,
    createWriteStreamIfNotExists
}
