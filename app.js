// imports :

const express = require('express');

const path = require('path');

const pageRouter = require('./routes/pages');

// app initialization :

const app = express();

// methods :

// for body parser :

app.use(express.urlencoded({ extended: false }));

// serve static files :

app.use(express.static(path.join(__dirname, 'public')));

// template engine :

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

// routers :

app.use('/', pageRouter)

// handle errors :

// handle error 404 :

app.use((req, res, next) => {

    let err = new Error('Page not found');

    err.status = 404;

    next(err);
});

// handle any other error :

app.use((err, req, res, next) => {

    res.status(err.status || 500);

    res.send(err.message)
});

// setting up the server :

app.listen(3000, () => {

    // To confirm that server is started on the default port.

    console.log('Server is running on port 3000');
})

// Exports :

module.exports = app;