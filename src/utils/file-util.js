const fs = require('fs');
const path = require('path');
const os = require('os');

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




/**
 *
 * @param filePath
 * @param data <string> | <Buffer> https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#class-buffer
 * @returns {Promise<unknown>}
 */
function appendFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, err => {
            if (err) {
                reject(err);
            }

            resolve();
        })
    })
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


function currentDirPath() {
    return path.resolve(__dirname);
}


module.exports = {
    isFileExistsAsync,
    appendFileAsync,
    normalizePath,
    homedirPath
}

//const os = require('os');

console.log(os.EOL);

