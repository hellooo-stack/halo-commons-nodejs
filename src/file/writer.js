/**
 * @author: Jeb.Wang
 * @date: 2022/12/26 23:00
 */
const fs = require('fs');
const path = require('path');
const fileUtil = require('../utils/file-util');


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

function appendToFile(data, filePath, createIfNotExists = true) {
    if (!createIfNotExists) {
        const fileExists = fileUtil.isFileExistsAsync();
        if (!fileExists) {
            return false;
        }
    }

    try {
        fs.appendFileSync(filePath, data, {flag: 'a'});
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function appendToFileAsync(data, filePath, createIfNotExists = true) {
    return new Promise((resolve, reject) => {
        if (!createIfNotExists) {
            const fileExists = fileUtil.isFileExistsAsync();
            if (!fileExists) {
                resolve(false);
            }
        }

        fs.appendFile(filePath, data, (err) => {
            if (err) {
                console.error(err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function writeLineToFile(line, filePath, writeIfExists = false) {
    return writeToFile(`${line}\n`, filePath, writeIfExists);
}

function writeLineToFileAsync(line, filePath, writeIfExists = false) {
    return writeToFileAsync(`${line}\n`, filePath, writeIfExists);
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

