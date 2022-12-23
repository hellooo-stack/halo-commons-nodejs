const excel = {
    ...require('./excel')
}

const utils = {
    ...require('./utils')
}

const allInOne = {
    ...excel,
    ...utils
}

const hellooo_commons = {
    excel,
    utils,
    ...allInOne
};

module.exports = hellooo_commons;
