/**
 * @author: Jeb.Wang
 * @date: 2022/12/26 23:00
 */
const fs = require('fs');
const fileUtil = require('../utils/file-util');


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
        const fileExists = fileUtil.isFileExists(filePath);
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
    return new Promise(async (resolve, reject) => {
        if (!createIfNotExists) {
            const fileExists = await fileUtil.isFileExistsAsync();
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

function appendLineToFile(line, filePath, createIfNotExists = true) {
    return appendToFile(`${line}\n`, filePath, createIfNotExists);
}

function appendLineToFileAsync(line, filePath, createIfNotExists = true) {
    return appendToFileAsync(`${line}\n`, filePath, createIfNotExists);
}

function writeJSONToFile(data, filePath, writeIfExists = false) {
    try {
        const json = JSON.stringify(data);
        const writeFlag = writeIfExists ? 'w' : 'wx';
        fs.writeFileSync(filePath, json, {flag: writeFlag});
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function writeJSONToFileAsync(data, filePath, writeIfExists = false) {
    return new Promise((resolve, reject) => {
        try {
            const json = JSON.stringify(data);
            const writeFlag = writeIfExists ? 'w' : 'wx';
            fs.writeFile(filePath, json, {flag: writeFlag}, err => {
                if (err) {
                    console.error(err);
                    resolve(false);
                }

                resolve(true);
            });
        } catch (err) {
            console.error(err);
            resolve(false);
        }
    });
}


//-------------------stream api: not implemented yet-------------------
//function createWriteStream(filePath) {
//    return fs.createWriteStream(filePath);
//}
//
//function writeDataToStream(writeStream, data) {
//    writeStream.write(data);
//}
//
//function endWrite(writeStream) {
//    writeStream.end();
//}
//
//function writeDataToFile(filePath, data) {
//    const writeStream = createWriteStream(filePath);
//    writeDataToStream(writeStream, data);
//    endWrite(writeStream);
//}
//----------------------------------------------------------------------

const writer = {
    writeToFile,
    writeToFileAsync,
    appendToFile,
    appendToFileAsync,
    writeLineToFile,
    writeLineToFileAsync,
    appendLineToFile,
    appendLineToFileAsync,
    writeJSONToFile,
    writeJSONToFileAsync
}

module.exports = writer;
