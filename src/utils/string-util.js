/**
 * @author: Jeb.Wang
 * @date: 2023/1/1 13:23
 */
const _ = require('lodash');


function isEmpty(string) {
    return _.isEmpty(string);
}

function isNotEmpty(string) {
    return !_.isEmpty(string);
}

function isBlank(string) {
    return _.isEmpty(string.trim());
}

function isNotBlank(string) {
    return !_.isEmpty(string.trim());
}

module.exports = {
    isEmpty,
    isNotEmpty,
    isBlank,
    isNotBlank
}
