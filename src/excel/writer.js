const XLSX = require('xlsx');
const _ = require('lodash');

/**
 * Writes the specified two-dimensional array to a new Excel workbook,
 * If the file already exists, create a new one and replace it.
 *
 * @param rows The two-dimensional array to write to the workbook.
 * @param filePath The file path of the new Excel workbook.
 * @param sheetName The name of the sheet. Defaults to 'Sheet1'.
 * @returns {boolean} Returns true if the workbook was successfully written, false otherwise.
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
 * Adds a new sheet to an existing Excel file and writes the contents of a two-dimensional array to the new sheet.
 *
 * @param rows A two-dimensional array of any type containing the data to be written to the new sheet.
 * @param filePath The path to the Excel file to which the new sheet will be added.
 * @param sheetName The name of the new sheet. Default value is 'NewSheet1'.
 * @returns {boolean} empty rows or workbook of filePath not exists: false, otherwise and successfully write: true
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
 * @returns {boolean} true if it was successful, and false otherwise.
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

        const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1})
        if (sheetData.length === 0) {
//            if the sheet is empty, we should write data from row_0(default is row_1, which means row_0 is empty)
            XLSX.utils.sheet_add_aoa(sheet, rows, {origin: 0});
        } else {
//            otherwise write data from the lastRow + 1
            XLSX.utils.sheet_add_aoa(sheet, rows, {origin: -1});
        }

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
 * @returns {boolean} true if it was successful, and false otherwise.
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
