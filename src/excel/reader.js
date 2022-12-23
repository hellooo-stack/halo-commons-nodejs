const XLSX = require('xlsx');
const _ = require('lodash');

/**
 * return rows in the specific sheet, each row will be as an item in the resulting array
 *
 * @param filePath file path of the workbook
 * @param sheetIndex default to 0
 * @returns {unknown[]|*[]} array containing the rows, each row is an array: [['col1 of row1', 'col2 of row1'], ['col1 of row2', 'col2 of row2']]
 */
function rowsFromExcel(filePath, sheetIndex = 0) {

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
 * @param filePath file path of the workbook
 * @param sheetIndex default to 0
 * @returns {string[]|*[]} array containing the headers
 */
function headersFromExcel(filePath, sheetIndex = 0) {

    const parsedRows = rowsFromExcel(filePath, sheetIndex);
    if (_.isEmpty(parsedRows)) {
        return [];
    }

    return parsedRows[0];
}

function contentsFromExcel(filePath, sheetIndex = 0) {

    const parsedRows = rowsFromExcel(filePath, sheetIndex);
//    the first row is header,
    if (_.size(parsedRows) <= 1) {
        return [];
    }
//    so we need to remove the first row
    return _.takeRight(parsedRows, parsedRows.length - 1);
}

function contentsAsJSONFromExcel(filePath, sheetIndex = 0) {

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
//    将工作表转换为JSON格式：
//      1. 从第二行开始，一行一个item，其中item的key为第一行对应的列，如果第一行对应的列不存在，则为_EMPTY_*
//      2. 表格内无数据，或只有一行数据时，不会解析成JSON，即：jsonData为空
    const rowsAsJSON = XLSX.utils.sheet_to_json(sheet);
//    当excel表格内的sheet内容为空（一行数据都没有）的时候，返回空数组
    if (_.isEmpty(rowsAsJSON)) {
        return [];
    }

    return rowsAsJSON;
}

const reader = {
    rowsFromExcel,
    headersFromExcel,
    contentsFromExcel,
    contentsAsJSONFromExcel
}

module.exports = reader;
