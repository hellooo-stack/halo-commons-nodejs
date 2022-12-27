/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:33
 */
const fileUtil = require('../utils/file-util');
const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

function readFromFile(filePath) {
    if (!fileUtil.isFile(filePath)) {
        return null;
    }

//    If the encoding option is specified then this function returns a string.
//    Otherwise it returns a buffer
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
}

function readFromFileAsync(filePath) {
    return new Promise(resolve => {
        if (!fileUtil.isFile(filePath)) {
            return resolve(null);
        }

        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                console.error(err);
                resolve(null);
            }

            resolve(data);
        });
    });
}

function readLinesFromFileAsync(filePath) {
    return new Promise(resolve => {
        if (!fileUtil.isFile(filePath)) {
            return resolve([]);
        }

        let lines = [];
        try {
            const readStream = fs.createReadStream(filePath);
            const rl = readline.createInterface({
                input: readStream
            });

            rl.on('line', line => {
                lines.push(line);
            });

            rl.on('close', () => {
                resolve(lines);
            });
        } catch (err) {
            console.error(err);
            resolve(lines);
        }
    });
}

/**
 *
 * @param filePath
 * @param lineNum default is -1 means returning the last line
 * @returns {Promise<unknown>}
 */
function readLineFromFileAsync(filePath, lineNum = -1) {
    return new Promise(async resolve => {
        if (lineNum <= 0 && lineNum !== -1) {
            resolve(null);
        }

        const lines = await readLinesFromFileAsync(filePath);
        if (_.size(lines) <= 0) {
            resolve(null);
        } else if (lineNum > _.size(lines) || lineNum === -1) {
            resolve(_.get(lines, _.size(lines) - 1));
        } else {
            resolve(_.get(lines, lineNum - 1));
        }
    });
}

const reader = {
    readFromFile,
    readFromFileAsync,
    readLinesFromFileAsync,
    readLineFromFileAsync
}

module.exports = reader;
