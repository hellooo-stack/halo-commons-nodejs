/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:20
 */
// 基本使用
const request = require('request');

request('https://www.baidu.com', (error, response, body) => {
    // 如果有错误
    console.error('error: ', error);
    // 响应及响应码
    console.log('statusCode: ', response && response.statusCode);
    // 响应体
    console.log('body: ', body);
});
