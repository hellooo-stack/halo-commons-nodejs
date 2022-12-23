const XLSX = require('xlsx');
const _ = require('lodash');

/**
 * to get the headers of sheet 0
 * @param filePath
 * @param sheetIndex default to 0
 * @returns {string[]|*[]}
 */
function headers(filePath, sheetIndex) {

    sheetIndex = sheetIndex ? sheetIndex : 0;

//    读取Excel文件
    const workbook = XLSX.readFile(filePath);
//    获取第一个工作表
    const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
//    将工作表转换为JSON格式：
//      1. 从第二行开始，一行一个item，其中item的key为第一行对应的列，如果第一行对应的列不存在，则为_EMPTY_*
//      2. 表格内无数据，或只有一行数据时，不会解析成JSON，即：jsonData为空
    const jsonData = XLSX.utils.sheet_to_json(sheet);
//    当excel表格内的sheet内容为空（一行数据都没有）的时候，返回空数组
    if (_.isEmpty(jsonData)) {
        return [];
    }

    return Object.keys(jsonData[0]);
}

console.log(headers('./twosheets.xlsx', 0));
