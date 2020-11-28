const express = require('express');  
const { database, models } = require('./database');

const app = express();
const port = 8000;
 
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.json());
app.get("/", express.static("../frontend"))

// Api routes
// ...

// Api sync
app.get("/api/sync", (req, res) => { 
    database.sync({ force: true })
    .then(() => res.status(201).send("Sincronizare reusita cu baza de date!") )
    .catch((error) => res.status(500).send(`Sincronizare nereusita. ${error}`) ); 
}); 
app.get("/api/weird-sync", (req, res) => {
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

app.listen(port, () => console.log(`Now listening on ${port}`));