const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 *
 * @param filePath
 * @param data <string> | <Buffer> https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#class-buffer
 * @returns {Promise<unknown>}
 */
function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data,  err => {
            if (err) {
                reject(err);
            }

            resolve();
        })
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

module.exports = {
    writeFileAsync: writeFileAsync,
    appendFileAsync: appendFileAsync,
    normalizePath: normalizePath,
    homedirPath: homedirPath
}

