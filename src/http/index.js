/**
 * @author: Jeb.Wang
 * @date: 2023/1/1 15:12
 */
const http = {
    ...require('./axios'),
    ...require('./request')
};

module.exports = http;
