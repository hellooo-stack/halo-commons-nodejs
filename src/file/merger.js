/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:33
 */
const fileUtil = require('../utils/file-util');
const path = require('path')

function appendBToA(pathA, pathB) {

}

function replaceAWithB(pathA, pathB) {

}

function copyTo(from, to) {
    return new Promise(async (resolve, reject) => {
        const isFileReadable = await fileUtil.isFileReadableAsync(from);
        if (!isFileReadable) {
            resolve(false);
        }

        // if file exists, we not cover it
        const isFileExists = await fileUtil.isFileExistsAsync(to);
        console.log('isfilfex: ', isFileExists);
        if (isFileExists) {
            resolve(false);
        }

        resolve(true);
    });
}


(async () => {
    const fromPath = path.resolve(__dirname, 'reader.js');
    const toPath = path.resolve(__dirname, 'to.js');
    console.log('begin')
    const copyResult = await copyTo(fromPath, toPath);
    console.log('result: ', copyResult);
})();



