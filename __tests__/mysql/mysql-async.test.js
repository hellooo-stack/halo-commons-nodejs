/**
 * author: Jeb.Wang
 * date: 2020/4/24
 */
const mysqlAsync = require('src/mysql');

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'nopwd'
};

const connectionConfig = {
    ...mysqlConfig
};

const connectionPoolConfig = {
    ...mysqlConfig
};

describe('test promisify connection', () => {
    test('creates a new connection', () => {

        // Act
        const connection = mysqlAsync.createConnection(connectionConfig);

        // Assert
        expect(connection).toBeDefined();
    });


});

describe('test promisify connection pool', () => {
    test('creates a new connection pool', () => {

        // Act
        const pool = mysqlAsync.createPool(connectionPoolConfig);

        // Assert
        expect(pool).toBeDefined();
    });
});

