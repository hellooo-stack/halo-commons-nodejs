const XLSX = require('xlsx');
const {head} = require("axios");
function headers(filePath) {
    // 读取 Excel 文件
    const workbook = XLSX.readFile(filePath);

// 获取第一个工作表
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

// 将工作表转换为 JSON 格式
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    XLSX.utils.

    console.log(jsonData)
    const headers = Object.keys(jsonData[10]);

    console.log(headers);
}

function headers(filePath, sheetName) {

}

headers('./generated.xlsx');
