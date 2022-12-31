/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:20
 */
const axios = require('axios');
const cookie = require('cookie');

function request(config) {
    return axios.request(config);
}

function get(url, params = {}) {

    if (this instanceof AxiosRequest) {
        return this.instance.get(url, {
            params: params
        });
    } else {
        return axios.get(url, {
            params: params
        });
    }
}

function getWithHeader(url, headers = {}, params = {}) {
    if (this instanceof AxiosRequest) {
        return this.instance.get(url, {
            headers: headers,
            params: params
        });
    } else {
        return axios.get(url, {
            headers: headers,
            params: params
        });
    }
}

function getWithCookie(url, cookies = {}, params = {}) {

}

function getWithProxy(url, proxy, params = {}) {
    if (this instanceof AxiosRequest) {
        return this.instance.get(url, {
            proxy: proxy,
            params: params
        });
    } else {
        return axios.get(url, {
            proxy: proxy,
            params: params
        });
    }
}

function post(url, data) {

}

function postWithHeader(url, data, headers) {

}

function postWithCookie(url, data, cookies) {

}

function postWithProxy(url, data, proxy) {

}

// todo
// https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
function getAndPipeTo(url, filePath, config) {

}

function createAxiosRequest(baseURL = '', config = {}) {
    if (config.baseURL) {
        delete config.baseURL;
    }

    if (config.url) {
        delete config.url;
    }

    config = {
        baseURL,
        ...config
    };

    return new AxiosRequest(config);
}
function AxiosRequest(config) {
    this.instance = axios.create(config);
}

AxiosRequest.prototype.get = get;
AxiosRequest.prototype.getWithHeader = getWithHeader;
AxiosRequest.prototype.getWithCookie = getWithCookie;
AxiosRequest.prototype.getWithProxy = getWithProxy;
AxiosRequest.prototype.post = post;
AxiosRequest.prototype.postWithHeader = postWithHeader
AxiosRequest.prototype.postWithCookie = postWithCookie;
AxiosRequest.prototype.postWithProxy = postWithProxy;
AxiosRequest.prototype.getAndPipeTo = getAndPipeTo;


//module.exports = {
//    request,
//    get,
//    getWithHeader,
//    getWithCookie,
//    getWithProxy,
//    post,
//    postWithHeader,
//    postWithCookie,
//    postWithProxy,
//    getAndPipeTo,
//    createAxiosRequest
//}

//(async () => {
//    const result = await get('https://www.baidu.com');
////    console.log('result: ', result);
////
//    const axiosRequest = createAxiosRequest('http://localhost:8381');
//    const result1 = await axiosRequest.get('/members/api/member/');
//    console.log('result1: ', result1);
//})();

const setCookie = cookie.serialize('1','2','3','5');
console.log(setCookie);