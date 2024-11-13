const excel = {
    ...require('./excel')
};

const file = {
    ...require('./file')
};

const http = {
    ...require('./http')
};

const mysql = {
    ...require('./mysql')
};

const utils = {
    ...require('./utils')
};

const allInOne = {
    ...excel,
    ...file,
    ...http,
    ...mysql,
    ...utils
};

const hellooo_commons = {
    excelHelper: excel,
    fileHelper: file,
    httpRequest: http,
    mysqlAsync: mysql,
    utils,
    ...allInOne
};

module.exports = hellooo_commons;
