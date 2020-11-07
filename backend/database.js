const { Sequelize } = require('sequelize');

const db_host = 'localhost';
const db_name = 'copiuta';
const db_user_name = 'root';
const db_password = 'root';

const database = new Sequelize(db_name, db_user_name, db_password, {
    host: db_host,
    dialect: 'mysql'
});
database.authenticate()
    .then(() => console.log("Connected to the database!") )
    .catch(error => console.log(`Failed to connect to the database: ${error}`) );

module.exports = database;