const excel = {
    ...require('./excel')
};

const file = {
    ...require('./file')
};

const utils = {
    ...require('./utils')
};

const allInOne = {
    ...excel,
    ...file,
    ...utils
};

const hellooo_commons = {
    excel,
    file,
    utils,
    ...allInOne
};

module.exports = hellooo_commons;
