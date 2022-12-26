/**
 * @author: Jeb.Wang
 * @date: 2022/12/26 23:00
 */
const fs = require('fs');
const path = require('path');


const mypath = path.resolve(__dirname, 'write-to-file.txt');
const result = writeToFile('hello', mypath);
console.log('result: ', result);


function writeToFile(data, filePath, writeIfExists = false) {
    try {
        const writeFlag = writeIfExists ? 'w' : 'wx';
        fs.writeFileSync(filePath, data, {flag: writeFlag});
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 *
 * @param data https://nodejs.org/dist/latest-v18.x/docs/api/buffer.html#class-buffer
 * @param filePath
 * @param writeIfExists
 * @returns {Promise<unknown>}
 */
function writeToFileAsync(data, filePath, writeIfExists = false) {
    return new Promise((resolve, reject) => {
        const writeFlag = writeIfExists ? 'w' : 'wx';
        fs.writeFile(filePath, data, {flag: writeFlag}, err => {
            if (err) {
                console.error(err);
                resolve(false);
            }

            resolve(true);
        });
    });
}

function appendToFile(data, filePath) {
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data appended to file successfully');
        }
    });
}

function appendToFileAsync(data, filePath) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function writeLineToFile(line, filePath) {
    fs.appendFile(filePath, `${line}\n`, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Line written to file successfully');
        }
    });
}

function writeLineToFileAsync(line, filePath) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, `${line}\n`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function writeJSONToFile(json, filePath) {
    fs.writeFile(filePath, JSON.stringify(json), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('JSON written to file successfully');
        }
    });
}

function writeJSONToFileAsync(json, filePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(json), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


function createWriteStream(filePath) {
    return fs.createWriteStream(filePath);
}

function writeDataToStream(writeStream, data) {
    writeStream.write(data);
}

function endWrite(writeStream) {
    writeStream.end();
}

function writeDataToFile(filePath, data) {
    const writeStream = createWriteStream(filePath);
    writeDataToStream(writeStream, data);
    endWrite(writeStream);
}

