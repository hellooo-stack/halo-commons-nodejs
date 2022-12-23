const XLSX = require('xlsx');
const _ = require('lodash');
const rows = require('../../src/excel');
console.log(rows);
// const reader = require('../../src/excel/reader');

// reader.rows()

// test('should return rows in the specific sheet', () => {
//     const filePath = 'generated.xlsx';
//     const sheetIndex = 0;
//     const expectedRows = [['col1 of row1', 'col2 of row1'], ['col1 of row2', 'col2 of row2']];
//
//     const result = rows(filePath, sheetIndex);
//     expect(result).toEqual(expectedRows);
// });
