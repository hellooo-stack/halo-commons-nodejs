const utils = {
    ...require('./cryptoUtils'),
    ...require('./dateUtils'),
    ...require('./fileUtils'),
    ...require('./randomUtils'),
    ...require('./timingUtils')
};

module.exports = utils;
