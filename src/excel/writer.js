const XLSX = require('xlsx');
const _ = require('lodash');

/**
 * Write rows to a new Excel file, If the file already exists, create a new one and replace it
 *
 * @param rows array containing the rows, each row is an array: [['col1 of row1', 'col2 of row1'], ['col1 of row2', 'col2 of row2']]
 * @param filePath file path of the workbook
 * @param sheetName name of the sheet, default to Sheet1
 */
function writeToNewExcel(rows, filePath, sheetName = 'Sheet1') {

//    如果二维数组内容为空，则写入失败
    if (_.every(rows, _.isEmpty)) {
        return false;
    }

    try {
//    create a new workbook
        const workbook = XLSX.utils.book_new();
//    create a new sheet
        const sheet = XLSX.utils.aoa_to_sheet(rows);
//    add the sheet to the workbook
        XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
//    write the workbook to the file
        XLSX.writeFile(workbook, filePath);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * Write rows to a new sheet in an existing Excel file
 *
 * @param rows
 * @param filePath
 * @param sheetName
 */
function writeToExcelWithNewSheet(rows, filePath, sheetName = 'NewSheet1') {

//    如果二维数组内容为空，则写入失败
    if (_.every(rows, _.isEmpty)) {
        return false;
    }

    try {
//        Read the existing Excel file
        const workbook = XLSX.readFile(filePath);
//        Create a new worksheet with the rows
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
//        Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//        Write the updated workbook to the file
        XLSX.writeFile(workbook, filePath);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * append rows to the specific sheet of the workbook
 *
 * @param rows array containing the rows, each row is an array: [['col1 of row1', 'col2 of row1'], ['col1 of row2', 'col2 of row2']]
 * @param filePath file path of the workbook
 * @param sheetIndex index of the sheet, default to 0
 */
function appendToExcel(rows, filePath, sheetIndex = 0) {

//    如果二维数组内容为空，则写入失败
    if (_.every(rows, _.isEmpty)) {
        return false;
    }

    try {
//        read the workbook
        const workbook = XLSX.readFile(filePath);
//        get the sheet from the workbook
        const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
//        append the rows to the sheet
        XLSX.utils.sheet_add_aoa(sheet, rows, {origin: -1});
//        write the workbook to the file
        XLSX.writeFile(workbook, filePath);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * insert rows into the specific sheet of the workbook at the specific row
 *
 * @param rows array containing the rows, each row is an array: [['col1 of row1', 'col2 of row1'], ['col1 of row2', 'col2 of row2']]
 * @param filePath file path of the workbook
 * @param sheetIndex index of the sheet, default to 0
 * @param rowIndex index of the row to insert the rows, default to 1
 */
function insertIntoExcel(rows, filePath, sheetIndex = 0, rowIndex = 1) {

//    如果二维数组内容为空，则写入失败
    if (_.every(rows, _.isEmpty)) {
        return false;
    }

    try {
//        read the workbook
        const workbook = XLSX.readFile(filePath);
//        get the sheet from the workbook
        const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
//        insert the rows into the sheet at the specific row
        XLSX.utils.sheet_add_aoa(sheet, rows, {origin: `A${rowIndex}`});
//        write the workbook to the file
        XLSX.writeFile(workbook, filePath);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}


const writer = {
    writeToNewExcel,
    writeToExcelWithNewSheet,
    appendToExcel,
    insertIntoExcel
}

module.exports = writer;
