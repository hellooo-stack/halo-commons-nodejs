const reader = require('src/excel/reader');
const path = require('path');

const SAMPLE_FILE_NAME = "reader-sample.xlsx";
const SAMPLE_FILE_PATH = path.resolve(__dirname, SAMPLE_FILE_NAME);

const EMPTY_SAMPLE_FILE_NAME = "reader-empty-sample.xlsx";
const EMPTY_SAMPLE_FILE_PATH = path.resolve(__dirname, EMPTY_SAMPLE_FILE_NAME);

const TEST_SAMPLE_DATA = [
    ['col11', 'col12', 'col13'],
    ['col21', 'col22', 'col23'],
    ['col31', 'col32', 'col33'],
];

describe('test rowsFromExcel', () => {
    it('should return an empty array for an empty sheet', () => {
        const rows = reader.rowsFromExcel(EMPTY_SAMPLE_FILE_PATH);
        expect(rows).toEqual([]);
    });

    it('should return the rows for a non-empty sheet', () => {
        const rows = reader.rowsFromExcel(SAMPLE_FILE_PATH);
        expect(rows).toEqual(TEST_SAMPLE_DATA);
    });
});

describe('test headersFromExcel', () => {
    it('should return an empty array for an empty sheet', () => {
        const headers = reader.headersFromExcel(EMPTY_SAMPLE_FILE_PATH);
        expect(headers).toEqual([]);
    });

    it('should return an array of the headers for the sheet in the workbook', () => {
        const headers = reader.headersFromExcel(SAMPLE_FILE_PATH);
        expect(headers).toEqual(['col11', 'col12', 'col13']);
    });
})

describe('test contentsFromExcel', () => {
    it('should return an empty array for a sheet with rows num less than 1', () => {
        const contents = reader.contentsFromExcel(EMPTY_SAMPLE_FILE_PATH);
        expect(contents).toEqual([]);
    });

    it('should return the rows for the excel workbook', () => {
        const contents = reader.contentsFromExcel(SAMPLE_FILE_PATH);
        expect(contents).toEqual([
            ['col21', 'col22', 'col23'],
            ['col31', 'col32', 'col33'],
        ]);
    });
})

describe('test contentsAsJSONFromExcel', () => {
    it('should return an empty array for a a empty sheet', () => {
        const contentsAsJSON = reader.contentsAsJSONFromExcel(EMPTY_SAMPLE_FILE_PATH);
        expect(contentsAsJSON).toEqual([]);
    });

    it('should return the contents of in JSON format ', () => {
        const contentsAsJSON = reader.contentsAsJSONFromExcel(SAMPLE_FILE_PATH);
        expect(contentsAsJSON).toEqual([
            {col11: 'col21', col12: 'col22', col13: 'col23'},
            {col11: 'col31', col12: 'col32', col13: 'col33'},
        ]);
    });
})
