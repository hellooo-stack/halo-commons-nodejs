/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const {promisify} = require('util');
const mysql = require('mysql');

// ----for original connection----
function createConnection(config) {
    const connection = mysql.createConnection(config);
    return promisifyConnection(connection);
}

function promisifyConnection(connection) {
    return {
//        查询
        queryAsync: promisify(connection.query).bind(connection),
//        事务
        beginTransactionAsync: promisify(connection.beginTransaction).bind(connection),
        commitAsync: promisify(connection.commit).bind(connection),
        rollbackAsync: promisify(connection.rollback).bind(connection),
//        关闭连接
        endAsync: promisify(connection.end).bind(connection)
    };
}
// ----enf of for original connection----


// ----for connection pool----
function createPool(config) {
    return new ConnectionPool(config);
}

function ConnectionPool(config) {
    const pool = mysql.createPool(config);
    this.pool = pool;

    this.endPoolAsync = promisify(pool.end).bind(pool)
}

ConnectionPool.prototype.getConnectionAsync = function () {
    return new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }

            const promisifyConnection = {
                // 查询
                queryAsync: promisify(connection.query).bind(connection),
                // 事务
                beginTransactionAsync: promisify(connection.beginTransaction).bind(connection),
                commitAsync: promisify(connection.commit).bind(connection),
                rollbackAsync: promisify(connection.rollback).bind(connection),
                // 关闭当前连接, 由于是处于连接池的连接, 所以暂不提供对外接口.
                // endAsync: promisify(connection.end).bind(connection)
                // 连接池里面的连接用完后需要释放, 否则没有连接给后续请求使用
                release: () => {
                    connection.release();
                }
            };

            resolve(promisifyConnection);
        });
    })
}
// ----enf of for connection pool----


module.exports = {
    createConnection,
    createPool
}
