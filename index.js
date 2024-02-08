const express = require('express');
const session = require('express-session');

const app = express();
app.locals.pretty = true;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

const Database = require('./contactdb');
const db = new Database();
db.initialize();

app.use((req, res, next) => {
    console.log("Adding DB to request");
    req.db = db;
    next();
});

app.use(session({
    secret: 'cmps369',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    if ( req.session.user ) {
        res.locals.user = {
            id: req.session.user.id,
            email: req.session.user.email
        }
    }
    next()
});

app.use('/create', require('./routes/create'));
app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/main'));0

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});
