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

