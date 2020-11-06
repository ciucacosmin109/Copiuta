const express = require('express');
const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

const app = express();
const port = 8000;

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.json());
app.get("/", express.static("../frontend"))

const db_name = 'copiuta';
const db_user_name = 'root';
const db_password = 'root';

const database = new Sequelize(db_name, db_user_name, db_password, {
    host: 'localhost',
    dialect: 'mysql'
});


// to do


app.listen(port, () => console.log(`Now listening on ${port}`));