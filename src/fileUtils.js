const fs = require('fs');
const path = require('path');

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

module.exports = {
    writeFileAsync: writeFileAsync,
    appendFileAsync: appendFileAsync,
    normalizePath: normalizePath
}

