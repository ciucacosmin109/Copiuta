const modelsSetup = require('./models');
const sequelize = require('sequelize');
const Sequelize = sequelize.Sequelize;
 
const config = require('./config.json'); 

const database = new Sequelize(config.database.name, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
});
const models = modelsSetup(database, sequelize); 

database.authenticate()
    .then(() => console.log("Connected to the database!") )
    .catch(error => console.log(`Failed to connect to the database: ${error}`) );

module.exports = { 
    database,
    models
};