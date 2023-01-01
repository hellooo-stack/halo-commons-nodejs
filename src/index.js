const excel = {
    ...require('./excel')
};

const file = {
    ...require('./file')
};

const http = {
    ...require('./http')
};

const utils = {
    ...require('./utils')
};

const allInOne = {
    ...excel,
    ...file,
//    ...http,
    ...utils
};

const hellooo_commons = {
    excel,
    file,
    http,
    utils,
    ...allInOne
};

module.exports = hellooo_commons;
