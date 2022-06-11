// imports :

const util = require('util');

const mysql = require('mysql');

/** connection to mySql database */

const pool = mysql.createPool({

    connectionLimit: 10,
    host: 'localhost',
    //port: '3306',
    user: 'root', // use your mysql username.
    password: 'JB@hlt!2021', // user your mysql password.
    database: 'user_auth'
});

// initialisation de la connection :

pool.getConnection((err, connection) => {

    // handle connection errors :

    if(err) {

        console.error("Something went wrong during connection to sql database");

        // to see the error in details for dev mode :

        console.log(err);
    }

    if(connection) {

        // release the connection :

        connection.release();

        return;
    }
});

// query object method initialization :

pool.query = util.promisify(pool.query);

// exports :

module.exports = pool;