/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:20
 */
const axios = require('axios');
const fileUtil = require('../utils/file-util');
const httpUtil = require('../utils/http-util');
const stringUtil = require('../utils/string-util');

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
    const cookie = httpUtil.serializeCookiesToString(cookies);
    let headers = {};
    if (stringUtil.isNotBlank(cookie)) {
        headers['Cookie'] = cookie;
    }

    return getWithHeader(url, headers, params);
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
    if (this instanceof AxiosRequest) {
        return this.instance.post(url, data);
    } else {
        return axios.post(url, data);
    }
}

function postWithHeader(url, data, headers) {
    if (this instanceof AxiosRequest) {
        return this.instance.post(url, data, {
            headers: headers
        });
    } else {
        return axios.post(url, data, {
            headers: headers
        });
    }
}

function postWithCookie(url, data, cookies) {
    const cookie = httpUtil.serializeCookiesToString(cookies);
    let headers = {};
    if (stringUtil.isNotBlank(cookie)) {
        headers['Cookie'] = cookie;
    }

    return postWithHeader(url, data, headers);
}

function postWithProxy(url, data, proxy) {
    if (this instanceof AxiosRequest) {
        return this.instance.post(url, data, {
            proxy: proxy
        });
    } else {
        return axios.post(url, data, {
            proxy: proxy
        });
    }
}

function downloadAndPipeTo(url, filePath, config = {overwrite: false}) {
    return new Promise(async resolve => {
        const overwrite = config.overwrite;
        if (!overwrite && await fileUtil.isFileExistsAsync(filePath)) {
            return resolve(false);
        }
        delete config.overwrite;

        let request;
        if (this instanceof AxiosRequest) {
            request = this.instance;
        } else {
            request = axios;
        }

        try {
            delete config.responseType;
            const response = await request.get(url, {
                responseType: 'stream',
                ...config
            });

            const writeStream = overwrite ? fileUtil.createWriteStream(filePath) : fileUtil.createWriteStreamIfNotExists(filePath);
            response.data.pipe(writeStream);
            response.data.on('end', () => {
//                console.log('download success');
                resolve(true);
            });

            response.data.on('error', err => {
                console.error(err);
                resolve(false);
            });

//            for debug
//            response.data.on('data', chunk => {
//                console.log('chunk read: ', chunk);
//            });
        } catch (err) {
            resolve(false);
        }
    });
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
AxiosRequest.prototype.downloadAndPipeTo = downloadAndPipeTo;


module.exports = {
    request,
    get,
    getWithHeader,
    getWithCookie,
    getWithProxy,
    post,
    postWithHeader,
    postWithCookie,
    postWithProxy,
    downloadAndPipeTo,
    createAxiosRequest
}

