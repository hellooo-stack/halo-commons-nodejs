# Commons-NodeJS

![Code Size](https://img.shields.io/github/languages/code-size/hellooo-stack/hellooo-commons-nodejs)
![NPM](https://img.shields.io/npm/v/@hellooo-stack/hellooo-commons)
![GitHub license](https://img.shields.io/github/license/hellooo-stack/hellooo-commons-nodejs)

Commons-NodeJS is a common Node.js library used in the Hellooo Stack. 
It provides a range of useful functionalities for Excel, File, HTTP, MongoDB, MySQL, Redis and other common tasks. 
As a developer, this library is a great tool for quickly and efficiently building Node.js applications, 
allowing you to handle common tasks without having to reinvent the wheel.


# QuickStart
## Installation
You can easily install the client library using the following command:
```shell
npm i @hellooo-stack/hellooo-commons
```

## Features
You can find full examples in the 'doc/examples' directory.
And here are some of the key features and example code for using this library:

### Excel
The Excel module offers convenient methods for reading from and writing to Excel files,
allowing you to perform these tasks with just one line of code

### File
The File module supports file detection and provides read/write functionalities, as well as the ability to handle large files.

### HTTP
The HTTP module supports the use of ES6 syntax for calling the HTTP module.

### MySQL
The MySQL module supports the use of ES6 syntax for calling the MySQL module.
```javascript
const {mysqlAsync, utils: {datetimeUtil}} = require('@hellooo-stack/hellooo-commons');
const mysql = require('mysql');

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'nopwd',
    database: 'example',
    connectionLimit: 10
};
(async () => {
    const pool = mysqlAsync.createPool(mysqlConfig);
    const connection = await pool.getConnectionAsync();
    
    const insertSQL = `insert into .... values ...`;
    await connection.queryAsync(insertSQL);

    // release connection
    connection.release();

    // end pool
    await pool.endPoolAsync();
})();
```

### Redis
The Redis module supports the use of ES6 syntax for calling the MySQL module.


# Contributing
We welcome contributions to the Commons-NodeJS library. 
Please refer to the [Contributing Guide](CONTRIBUTING.md) for more information.

# License
This library is licensed under the Apache Version 2.0 license. 
Please see the [LICENSE](LICENSE) file for more information.



