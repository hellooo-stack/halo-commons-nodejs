const utils = {
    ...require('./crypto-util.test'),
    ...require('./datetime-util.test'),
    ...require('./file-util.test'),
    ...require('./random-util.test'),
    ...require('./thread-util.test')
};

module.exports = utils;
