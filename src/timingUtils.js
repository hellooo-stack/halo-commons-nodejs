/**
 * @author: Jeb.Wang
 * @date: 2022/11/20 15:23
 */

function sleep(mills) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, mills);
    });
}

module.exports = {
    sleep: sleep
};

