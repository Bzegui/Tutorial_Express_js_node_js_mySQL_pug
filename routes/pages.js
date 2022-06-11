// imports :

const express = require('express');

// import Object user :

const User = require('../core/user')

// create new instance of User object :

const user = new User();

const router = express.Router();

// To get index page :

router.get('/', (req, res, next) => {

    res.render('index', {title: "My application"});
})

// Get home page :

router.get('/home', (req, res, next) => {

    // To inform the user that he reaches the home page :

    res.send('Welcome to the home page');
});

// Post login data :

router.post('/login', (req, res, next) => {

    // To inform the user that he reaches the home page :

    User.login(req.body.username, req.body.password, function(result) {

        if (result) {

            // to send a login confirmation message to the user :

            res.send('Logged in as : ' + result.username);

        } else {

            // to send an error message to the user if login fails :

            res.send('Username or Password incorrect');
        }    
    });
});

// Post register data :

router.post('/register', (req, res, next) => {

    // to store the user register informations :

    let userInput = {

        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    // Object pass as a parameter to 'create' function :

    user.create(userInput, function(lastId) {

        if (lastId) {

            // to send a registration confirmation message to user :

            res.send('Welcome' + ' ' + userInput.username)

        } else {

            console.log('Error during the creation of a new user');
        }

                
    });
});

// Exports :

module.exports = router;