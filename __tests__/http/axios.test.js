/**
 * @author: Jeb.Wang
 * @date: 2022/12/22 19:20
 */

const axios = require('axios');

// Make a request for a user with a given ID


test('', () => {
    axios.get('http://www.baidu.com')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
});


test('t2', async () => {
    axios.get('https://www.baidu.com')
        .then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);

        });
});

test('t3', async () => {

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        console.log('before: ', config);
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

// Add a response interceptor
    axios.interceptors.response.use(function (response) {
        console.log('response: ', response);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    await axios.get('https://www.baidu.com')
        .then(function (response) {
//            console.log(response.data);
//            console.log(response.status);
//            console.log(response.statusText);
//            console.log(response.headers);
//            console.log(response.config);

        });
});

//export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
test('request google', async () => {
    const result = await axios.get('https://www.google.com', {
        proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 7890
        }
    });
    console.log(result);
})