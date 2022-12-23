const XLSX = require("xlsx");

function headers(filePath) {
    // 读取 Excel 文件
    const workbook = XLSX.readFile(filePath);

// 获取第一个工作表
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

// 将工作表转换为 JSON 格式
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    // XLSX.utils.

    // console.log(jsonData);
    console.log(jsonData[0]);
    // const headers = Object.keys(jsonData[10]);

    const sheet1 = workbook.Sheets[workbook.SheetNames[1]];
    const jsonData1 = XLSX.utils.sheet_to_json(sheet1);
    console.log(jsonData1[0]);

    const sheetName = workbook.SheetNames;
    console.log(sheetName);
}