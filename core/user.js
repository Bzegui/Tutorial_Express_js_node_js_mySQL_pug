// imports :

const pool = require('./pool');

// import for password hash :

const bcrypt = require('bcrypt');

// user function :

function User() {};

User.prototype = {

    // find user data by id or username :

    find: function(user = null, callback)

    {
        if (user) {

            // test the variable type to select search criteria.

            // if user = number, return field = id; otherwise (user = string), return field = username.

            let field = Number.isInteger(user) ? 'id' : 'username'
        }

        // define search query :

        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        // errors handling :

        pool.query(sql, user, function(err, result) {

            // handle errors :

            if (err) {

                throw err;
            }

            // callback function :

            callback(result);
        });
    },

    // to create a new user :

    create : function(body, callback) {

        let password = body.password;

        // to hash the password to database (bcrypt algorythm) :

        body.password = bcrypt.hashSync(password, 10);

        // create an array to store query values :
        
        let bind = [];

        // push body values into bind array :

        for (queryValue in body) {

            bind.push(body[queryValue]);
        }

        // sql query to store values into database :

        let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;

        // errors handling :

        pool.query(sql, bind, function(err, lastId) {

            // handle errors :

            if (err) {

                throw err;
            }

            // callback function :

            callback(lastId);
        });
    },

    // to configure the login :

    login : function(username, password, callback) {

        // to search for an existing user in database :

        this.find(username, function(user) {

            // if the user exists in the database :

            if (user) {

                // if user entered password is correct (password hash comparison) :

                if(bcrypt.compareSync(password, user.password)) {

                    callback(result);

                    return;
                }

            }

            // if the user doesn't exists in the database :

            callback(null);
        });
    }
}

// exports :

module.exports = User;




