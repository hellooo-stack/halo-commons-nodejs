/**
 * @author: Jeb.Wang
 * @date: 2023/1/1 12:24
 */
const _ = require('lodash');
const cookie = require('cookie');


/**
 * Serializes an object into a string suitable for use as a cookie value.
 *
 * @param {Object} cookies - The object to serialize.
 * @returns {string} The serialized string.
 */
function serializeCookiesToString(cookies) {
    if (_.isEmpty(cookies)) {
        return '';
    }

    const serializedCookies = [];
    for (const [key, value] of Object.entries(cookies)) {
        serializedCookies.push(cookie.serialize(key, value));
    }

    return serializedCookies.join(';');
}

module.exports = {
    serializeCookiesToString
}
