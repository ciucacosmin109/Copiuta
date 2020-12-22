const express = require('express'); 
const session = require('express-session'); 
const bodyParser = require('body-parser');
const cors = require("cors");

const { database, models } = require('./database');
const router = require('./routes');
const config = require('./config.json');

const app = express(); 

// CORS 
app.use(cors({
    origin: config.cors.whitelist, 
	methods: config.cors.allowedMethods,
    credentials: true
}));

// JSON support
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login support
app.use(session({
	secret: config.sessionSecret, 
	resave: false,
	saveUninitialized: false
}));

// Hmm
/*app.use((req,res,next)=>{
	console.log(req);
	next();
})*/
 
// Api db sync
app.get("/api/sync", (req, res) => { 
    database.sync({ force: true })
    .then(() => res.status(201).send("Sincronizare reusita cu baza de date!") )
    .catch((error) => res.status(500).send(`Sincronizare nereusita. ${error}`) ); 
});   

// Api routes
app.use("/", router);

app.listen(config.port, () => console.log(`Now listening on ${config.port}`));