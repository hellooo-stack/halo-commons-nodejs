/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:33
 */
const fileUtil = require('../utils/file-util');
const fs = require('fs');


function appendAToB(fileAPath, fileBPath) {
    return new Promise(async (resolve, reject) => {
        const isFileAReadable = await fileUtil.isFileReadableAsync(fileAPath);
        if (!isFileAReadable) {
            resolve(false);
        }

        const isFileBWritable = await fileUtil.isFileWritableAsync(fileBPath);
        if (!isFileBWritable) {
            resolve(false);
        }

        try {
            const readStream = fs.createReadStream(fileAPath);
            const writeStream = fs.createWriteStream(fileBPath, {flags: 'a'});
            readStream.pipe(writeStream);

            resolve(true);
        } catch (err) {
            console.error(err);
            resolve(false);
        }
    });
}

function replaceAWithB(fileAPath, fileBPath) {
    return new Promise(async (resolve, reject) => {
        const isFileBReadable = await fileUtil.isFileReadableAsync(fileBPath);
        if (!isFileBReadable) {
            resolve(false);
        }

        const isFileAWritable = await fileUtil.isFileWritableAsync(fileAPath);
        if (!isFileAWritable) {
            resolve(false);
        }

        try {
            const readStream = fs.createReadStream(fileBPath);
            const writeStream = fs.createWriteStream(fileAPath);
            readStream.pipe(writeStream);

            resolve(true);
        } catch (err) {
            console.error(err);
            resolve(false);
        }
    });
}

function copyTo(from, to) {
    return new Promise(async (resolve, reject) => {
        const isFileReadable = await fileUtil.isFileReadableAsync(from);
        if (!isFileReadable) {
            resolve(false);
        }

        // if file exists, we would not cover it
        const isFileExists = await fileUtil.isFileExistsAsync(to);
        if (isFileExists) {
            resolve(false);
        }

        try {
            const readStream = fs.createReadStream(from);
            const writeStream = fs.createWriteStream(to);
            readStream.pipe(writeStream);

            resolve(true);
        } catch (err) {
            console.error(err);
            resolve(false);
        }
    });
}

const writer = {
    appendAToB,
    replaceAWithB,
    copyTo
}

module.exports = writer;
