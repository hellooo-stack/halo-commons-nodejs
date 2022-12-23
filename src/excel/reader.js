const XLSX = require('xlsx');
const _ = require('lodash');

function rows(filePath, sheetIndex) {

    sheetIndex = sheetIndex ? sheetIndex : 0;

//    读取Excel文件
    const workbook = XLSX.readFile(filePath);
//    获取指定工作表
    const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];

    const rows = XLSX.utils.sheet_to_json(sheet, {header: 1});
//    当excel表格内的sheet内容为空（一行数据都没有）的时候，返回空数组
    if (_.isEmpty(rows)) {
        return [];
    }

    return rows;
}

/**
 * return headers of specific sheet
 *
 * @param filePath
 * @param sheetIndex default to 0
 * @returns {string[]|*[]}
 */
function headers(filePath, sheetIndex) {
    sheetIndex = sheetIndex ? sheetIndex : 0;

    const parsedRows = rows(filePath, sheetIndex);
    if (_.isEmpty(rows)) {
        return [];
    }

    return parsedRows[0];
}


