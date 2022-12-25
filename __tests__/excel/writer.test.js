const writer = require('src/excel/writer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const _ = require('lodash');


const SAMPLE_FILE_NAME = "writer-sample.xlsx";
const SAMPLE_FILE_PATH = path.resolve(__dirname, SAMPLE_FILE_NAME);

const TEST_SAMPLE_DATA = [
    ['col11', 'col12', 'col13'],
    ['col21', 'col22', 'col23'],
    ['col31', 'col32', 'col33'],
];

// ---- delete sample file before each test and after each test
beforeEach(() => {
    if (fs.existsSync(SAMPLE_FILE_PATH)) {
        fs.unlinkSync(SAMPLE_FILE_PATH);
    }
});

afterEach(() => {
    if (fs.existsSync(SAMPLE_FILE_PATH)) {
        fs.unlinkSync(SAMPLE_FILE_PATH);
    }
});
// ----

describe('test writeToNewExcel', () => {

    it('should not create the new Excel when writing rows is empty', () => {
        expect(writer.writeToNewExcel([], SAMPLE_FILE_PATH)).toBe(false);
        expect(fs.existsSync(SAMPLE_FILE_PATH)).toBe(false);
    })

    it('should successfully write sheetName and rows into the Excel workbook', () => {
        const result = writer.writeToNewExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH);
        expect(result).toBe(true);
        expect(fs.existsSync(SAMPLE_FILE_PATH)).toBe(true);

        const workbook = XLSX.readFile(SAMPLE_FILE_PATH);
//        default sheet name of writeToNewExcel if 'Sheet1'
        expect(workbook.SheetNames).toEqual(['Sheet1']);

        const sheet = workbook.Sheets['Sheet1'];
        expect(XLSX.utils.sheet_to_json(sheet)).toEqual(
            [
                {col11: 'col21', col12: 'col22', col13: 'col23'},
                {col11: 'col31', col12: 'col32', col13: 'col33'}
            ]
        );
    })
});

describe('test writeToExcelWithNewSheet', () => {

    it('should return false if rows is empty', () => {
        const rows = [[]];
        expect(writer.writeToExcelWithNewSheet(rows, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return false if workbook is not exists yet', () => {
        expect(writer.writeToExcelWithNewSheet(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return true if rows is not empty', () => {
//        create a new empty Excel file
        newEmptyExcelFile(SAMPLE_FILE_PATH);
//        create a new sheet in the Excel file above, and write the rows to that new Sheet
        expect(writer.writeToExcelWithNewSheet(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(true);
    });

    it('should add a new worksheet to the workbook with the rows', () => {
//        create a new empty Excel file
        newEmptyExcelFile(SAMPLE_FILE_PATH);

        const newSheetName = 'NewSheet1';
        writer.writeToExcelWithNewSheet(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH, newSheetName);

        const workbook = XLSX.readFile(SAMPLE_FILE_PATH);
        const rowsInSheet = XLSX.utils.sheet_to_json(workbook.Sheets[newSheetName], {header: 1});
        expect(rowsInSheet).toEqual(TEST_SAMPLE_DATA);
    });
});

describe('test appendToExcel', () => {

    it('should return false if rows is empty', () => {
        const rows = [[]];
        expect(writer.appendToExcel(rows, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return false if workbook is not exists yet', () => {
        expect(writer.appendToExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return true if rows is not empty', () => {
        newEmptyExcelFile(SAMPLE_FILE_PATH);
        expect(writer.appendToExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(true);
    });

    it('should append rows to the sheet in the workbook', () => {
        newEmptyExcelFile(SAMPLE_FILE_PATH);

        const sheetIndex = 0;
        writer.appendToExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH, sheetIndex);

        const workbook = XLSX.readFile(SAMPLE_FILE_PATH);
        const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
        expect(XLSX.utils.sheet_to_json(sheet, {header: 1})).toEqual(TEST_SAMPLE_DATA);
    });
});

describe('test insertIntoExcel', () => {

    it('should return false if rows is empty', () => {
        const rows = [[]];
        expect(writer.insertIntoExcel(rows, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return false if workbook is not exists yet', () => {
        expect(writer.insertIntoExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(false);
    });

    it('should return true if rows is not empty', () => {
        newEmptyExcelFile(SAMPLE_FILE_PATH);
        expect(writer.insertIntoExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH)).toBe(true);
    });

    it('should insert rows into the sheet at the specific row', () => {
        newEmptyExcelFile(SAMPLE_FILE_PATH);

        const sheetIndex = 0;
        const rowIndex = 3;
        writer.insertIntoExcel(TEST_SAMPLE_DATA, SAMPLE_FILE_PATH, sheetIndex, rowIndex);

        const workbook = XLSX.readFile(SAMPLE_FILE_PATH);
        const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
//        sheetData should be [[], [], [row1], [row2], [row3]]
        const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});
        expect(_.takeRight(sheetData, TEST_SAMPLE_DATA.length)).toEqual(TEST_SAMPLE_DATA);
    });
});

function newEmptyExcelFile(fileName) {
    const workbook = XLSX.utils.book_new();
    const sheet1 = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.book_append_sheet(workbook, sheet1, "Sheet1");
    XLSX.writeFile(workbook, fileName);
}
