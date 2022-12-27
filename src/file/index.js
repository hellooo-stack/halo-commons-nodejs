/**
 * @author: Jeb.Wang
 * @date: 2022/12/27 20:54
 */
const file = {
    ...require('./writer'),
    ...require('./reader'),
    ...require('./merger')
};

module.exports = file;
