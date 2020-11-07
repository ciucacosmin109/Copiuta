const sequelize = require('sequelize');
const database = require('../database');

const Student = database.define('Student',{
    StudentId:{
        allowNull:false,
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        primaryKey:true
    },
    FirstName:{
        allowNull:false,
        type:sequelize.STRING
    },
    LastName:{
        allowNull:false,
        type:sequelize.STRING
    }, 
    Email:{
        allowNull:false,
        type:sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});

module.exports = Student;