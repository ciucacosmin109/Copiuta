const express = require('express'); 
const session = require('express-session'); 
const bodyParser = require('body-parser');
const { database, models } = require('./database');
const router = require('./routes');

const app = express();
const port = 8000;

// JSON support
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login support
app.use(session({
	secret: 'secret1234', // .....
	resave: false,
	saveUninitialized: false
}));

// Frontend
app.get("/", express.static("../frontend"))

// Api db sync
app.get("/api/sync", (req, res) => { 
    database.sync({ force: true })
    .then(() => res.status(201).send("Sincronizare reusita cu baza de date!") )
    .catch((error) => res.status(500).send(`Sincronizare nereusita. ${error}`) ); 
}); 
app.get("/api/sync2", (req, res) => {
    database.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => {
        database.sync({
            force: true
        }).then(() => {
            database.query('SET FOREIGN_KEY_CHECKS = 1')
            res.status(201).send("Sincronizare reusita cu baza de date!")
        }).catch((error) => {
            console.log(error)
            res.status(500).send(`Sincronizare nereusita. ${0}`, error)
        });
    });
}); 

// Api routes
app.use("/", router);

app.listen(port, () => console.log(`Now listening on ${port}`));