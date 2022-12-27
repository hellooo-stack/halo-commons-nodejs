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
    ...utils
};

const hellooo_commons = {
    excel,
    file,
    utils,
    ...allInOne
};

module.exports = hellooo_commons;
